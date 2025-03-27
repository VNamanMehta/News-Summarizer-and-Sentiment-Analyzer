# News Summarizer and Sentiment Analyzer

This is an end-to-end project that combines a **backend** and a **frontend** to provide a platform for summarizing news articles and analyzing their sentiment.

## Project Structure

### Backend

The backend is built with Python and uses **FastAPI** for serving APIs. It handles tasks like fetching news articles, summarizing them, and performing sentiment analysis.

#### Key Files:
- `main.py`: Entry point for the FastAPI application.
- `config.py`: Configuration settings for the backend.
- `tasks.py`: Background tasks for processing data.
- `routes/`: Contains API route definitions.
- `services/`: Contains business logic and helper functions.

#### Setup:
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
```
pip install -r requirements.txt
```
3. Run the backend server:
```
uvicorn app.main:app --reload
```


### Frontend
The frontend is built with Next.js and TypeScript. It provides a user-friendly interface for interacting with the backend services.

#### Key Files:
app/: Contains the main application layout and global styles.
components/: Reusable UI components.
public/: Static assets like images and icons.

#### Setup:
1. Navigate to the frontend/ directory
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Run the development server:
```
npm run dev
```

### Features
News Summarization: Extracts concise summaries from lengthy news articles.

Sentiment Analysis: Analyzes the sentiment (positive, negative, neutral) of the news content.

Responsive UI: A modern and responsive user interface built with Next.js.

#### Frontend (frontend/.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### How to Clone the Repository

To get started with this project, clone the repository to your local machine:

1. Open a terminal and run the following command:
   ```bash
   git clone https://github.com/VNamanMehta/News-Summarizer-and-Sentiment-Analyzer.git
   ```

2. Navigate into the project directory:
   ```bash
   cd news-summarizer-and-sentiment-analyzer
   ```

3. Follow the setup instructions for both the backend and frontend.

### Running the Project

1. Start the backend server:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to ```http://localhost:3000```.
