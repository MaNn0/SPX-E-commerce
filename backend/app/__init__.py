# Makes the 'app' directory a Python package
from pathlib import Path
import sys

# Add backend directory to Python path
sys.path.append(str(Path(__file__).parent.parent))