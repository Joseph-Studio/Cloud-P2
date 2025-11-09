import azure.functions as func
from azure.storage.blob import BlobServiceClient
import pandas as pd
import numpy as np
import io
import json
import os
from datetime import datetime
import base64
import matplotlib
matplotlib.use('Agg')  
import matplotlib.pyplot as plt
import seaborn as sns

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="ProcessNutrition", methods=["GET", "POST"])
def ProcessNutrition(req: func.HttpRequest) -> func.HttpResponse:
    """
    Azure Function to process nutritional data and return insights with chart data.
    Returns JSON with processed data suitable for frontend visualization.
    """
    start_time = datetime.now()
    print(f"\n{'='*60}")
    print(f"Azure Function Triggered: {start_time}")
    print(f"{'='*60}\n")
    
    # CORS headers for frontend access
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }
    

    if req.method == "OPTIONS":
        return func.HttpResponse(status_code=200, headers=headers)
    
    try:
        connect_str = os.environ.get('AzureWebJobsStorage')

        if not connect_str or connect_str == 'UseDevelopmentStorage=true':
            connect_str = (
                "AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;"
                "AccountName=devstoreaccount1;"
                "BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;"
            )
            print("[WARNING] Using Azurite (local storage)")
        else:
            print("[SUCCESS] Using Azure Blob Storage (cloud)")
        
        # Connect to blob storage
        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
        container_name = 'nutrition-data'  
        blob_name = 'All_Diets.csv'
        
        print(f"Connecting to container: {container_name}")
        container_client = blob_service_client.get_container_client(container_name)
        blob_client = container_client.get_blob_client(blob_name)
        
        print("Downloading CSV...")
        stream = blob_client.download_blob().readall()
        df = pd.read_csv(io.BytesIO(stream))
        print(f"[SUCCESS] Loaded {len(df)} rows")
        
        # Data cleaning
        numeric_cols = ['Protein(g)', 'Carbs(g)', 'Fat(g)']
        df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())
        
        print("Processing nutritional insights...")
        
        avg_macros = df.groupby('Diet_type')[numeric_cols].mean()

        recipe_counts = df['Diet_type'].value_counts()

        top_protein = df.nlargest(10, 'Protein(g)')[['Recipe_name', 'Diet_type', 'Protein(g)', 'Carbs(g)', 'Fat(g)']]

        correlation_matrix = df[numeric_cols].corr()

        cuisine_counts = df['Cuisine_type'].value_counts().head(10)

        bar_chart_data = []
        for diet_type, row in avg_macros.iterrows():
            bar_chart_data.append({
                'diet': diet_type,
                'protein': round(row['Protein(g)'], 2),
                'carbs': round(row['Carbs(g)'], 2),
                'fat': round(row['Fat(g)'], 2)
            })

        pie_chart_data = []
        for diet_type, count in recipe_counts.items():
            pie_chart_data.append({
                'name': diet_type,
                'value': int(count)
            })

        scatter_data = []
        top_50 = df.nlargest(50, 'Protein(g)')
        for _, row in top_50.iterrows():
            scatter_data.append({
                'protein': round(row['Protein(g)'], 2),
                'carbs': round(row['Carbs(g)'], 2),
                'diet': row['Diet_type'],
                'recipe': row['Recipe_name']
            })
        
        heatmap_data = []
        for i, row_name in enumerate(correlation_matrix.index):
            for j, col_name in enumerate(correlation_matrix.columns):
                heatmap_data.append({
                    'x': col_name,
                    'y': row_name,
                    'value': round(correlation_matrix.iloc[i, j], 3)
                })
        
        # Calculate execution time
        end_time = datetime.now()
        execution_time = (end_time - start_time).total_seconds()
  
        output_data = {
            'status': 'success',
            'timestamp': str(end_time),
            'execution_time_seconds': round(execution_time, 2),
            'metadata': {
                'total_records': len(df),
                'diet_types': df['Diet_type'].nunique(),
                'cuisine_types': df['Cuisine_type'].nunique(),
                'data_source': 'Azure Blob Storage' if 'core.windows.net' in connect_str.lower() else 'Azurite (Local)'
            },
            'insights': {
                'highest_protein_diet': avg_macros['Protein(g)'].idxmax(),
                'highest_carb_diet': avg_macros['Carbs(g)'].idxmax(),
                'highest_fat_diet': avg_macros['Fat(g)'].idxmax(),
                'total_recipes': len(df)
            },
            'charts': {
                'barChart': {
                    'title': 'Average Macronutrients by Diet Type',
                    'data': bar_chart_data
                },
                'pieChart': {
                    'title': 'Recipe Distribution by Diet Type',
                    'data': pie_chart_data
                },
                'scatterPlot': {
                    'title': 'Protein vs Carbs (Top 50 Recipes)',
                    'data': scatter_data
                },
                'heatmap': {
                    'title': 'Nutrient Correlation Matrix',
                    'data': heatmap_data
                }
            },
            'topProteinRecipes': top_protein.to_dict(orient='records')
        }
        
        print(f"[SUCCESS] Processing complete! Execution time: {execution_time}s")
        
        return func.HttpResponse(
            json.dumps(output_data, indent=2),
            mimetype="application/json",
            status_code=200,
            headers=headers
        )
        
    except Exception as e:
        print(f"[ERROR] {str(e)}")
        error_response = {
            "status": "error",
            "message": str(e),
            "timestamp": str(datetime.now())
        }
        return func.HttpResponse(
            json.dumps(error_response, indent=2),
            mimetype="application/json",
            status_code=500,
            headers=headers
        )


@app.route(route="health", methods=["GET"])
def health_check(req: func.HttpRequest) -> func.HttpResponse:
    """Simple health check endpoint"""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
    
    return func.HttpResponse(
        json.dumps({
            "status": "healthy",
            "timestamp": str(datetime.now()),
            "message": "Azure Function is running"
        }),
        status_code=200,
        headers=headers
    )