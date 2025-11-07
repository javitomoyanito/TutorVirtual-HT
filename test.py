import os
from openai import OpenAI

token = os.environ.get("GITHUB_TOKEN")
if not token:
    raise RuntimeError("⚠️ Falta GITHUB_TOKEN en el entorno")

client = OpenAI(
    base_url="https://models.github.ai/inference",
    api_key=token,
    default_headers={"X-GitHub-Api-Version": "2023-07-01"},
)

print("🔑 TOKEN:", token[:6] + "..." + token[-6:])

try:
    response = client.chat.completions.create(
        model="openai/gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Say OK."},
        ],
    )
    print("✅ OK:", response.choices[0].message.content)
except Exception as e:
    print("❌ ERROR:", e)
