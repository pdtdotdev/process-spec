import sys
import json
import argparse

# Mock Database of telemetry results
MOCK_DATABASE = {
    "EXP_2026_01": {
        "experiment_id": "EXP_2026_01",
        "name": "Checkout Flow Redesign",
        "status": "completed",
        "metrics": {
            "control_users": 15400,
            "control_conversions": 616,
            "control_mean": 0.040,
            "treatment_users": 15550,
            "treatment_conversions": 746,
            "treatment_mean": 0.048,
            "p_value": 0.003
        }
    },
    "EXP_2026_02": {
        "experiment_id": "EXP_2026_02",
        "name": "Sidebar Navigation Simplification",
        "status": "completed",
        "metrics": {
            "control_users": 850,
            "control_conversions": 85,
            "control_mean": 0.100,
            "treatment_users": 900,
            "treatment_conversions": 99,
            "treatment_mean": 0.110,
            "p_value": 0.085
        }
    }
}

def main():
    parser = argparse.ArgumentParser(description="Lookup growth experiment data.")
    parser.add_argument("--experiment_id", type=str, help="Experiment identifier to look up")
    
    # Also support parsing JSON from stdin if called as a payload tool
    args = parser.parse_args()
    
    experiment_id = args.experiment_id
    if not experiment_id:
        # Check if stdin contains arguments
        try:
            stdin_data = sys.stdin.read().strip()
            if stdin_data:
                payload = json.loads(stdin_data)
                experiment_id = payload.get("experiment_id")
        except Exception:
            pass
            
    if not experiment_id:
        print(json.dumps({"error": "Missing required parameter: experiment_id"}), file=sys.stderr)
        sys.exit(1)
        
    result = MOCK_DATABASE.get(experiment_id)
    if result:
        print(json.dumps(result, indent=2))
        sys.exit(0)
    else:
        print(json.dumps({"error": f"Experiment not found: {experiment_id}"}), file=sys.stderr)
        sys.exit(2)

if __name__ == "__main__":
    main()
