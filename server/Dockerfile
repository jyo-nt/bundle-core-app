# syntax=docker/dockerfile:1

FROM python:3.9-slim as base


WORKDIR /app/backend

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

COPY requirements.txt .

RUN pip install --upgrade pip

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

# Switch to the non-privileged user to run the application.
USER appuser

# Copy the source code into the container.
COPY . .

# # Expose the port that the application listens on.
# EXPOSE 8000

# Run the application.
# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]

# CMD gunicorn 'server.main.wsgi' --bind=0.0.0.0:8000
# CMD ["gunicorn", "-b", "0.0.0.0:8000", "server.main.wsgi:application"]
