export const env = {
	API_URL: import.meta.env?.API_URL ?? "http://localhost:8000",
	API_OPENAPI_SPEC_URL:
		import.meta.env?.OPENAPI_PATH ?? "http://localhost:3000/api/openapi.json",
};
