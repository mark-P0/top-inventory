export const env = {
	API_URL: import.meta.env?.API_URL ?? "http://localhost:8000",
	OPENAPI_PATH:
		import.meta.env?.OPENAPI_PATH ?? "http://localhost:8000/openapi.json",
};
