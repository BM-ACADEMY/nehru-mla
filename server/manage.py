#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Ensure the project root is in PYTHONPATH
PROJECT_ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(PROJECT_ROOT))

# Ensure the backend folder is in PYTHONPATH
BACKEND_DIR = PROJECT_ROOT / "nehru_backend"
sys.path.insert(0, str(BACKEND_DIR))

def main():
    """Run administrative tasks."""
    
    # Load environment variables
    load_dotenv(BACKEND_DIR / ".env")
    load_dotenv(BACKEND_DIR / ".env.local", override=True)

    # Django settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nehru_backend.settings')

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Is it installed? Missing virtualenv?"
        ) from exc

    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
