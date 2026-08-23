from fastapi import FastAPI

app = FastAPI(title="TrackSign")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
