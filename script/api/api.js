export default function createApi(url) {
    return {
            async get() {
            try {
                // Effectue une requête GET à l'URL spécifiée
                const response = await fetch(url);

                // Analyse la réponse de la requête en tant que JSON
                const data = await response.json();

                // Retourne les données récupérées depuis l'API
                return data;
            } catch (err) {
                // En cas d'erreur lors de la requête ou de la conversion en JSON, lance une nouvelle erreur
                throw new Error(err);
            }
        }
    };
}