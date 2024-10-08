import { dijkstra } from "./AlgoritmDjstr";

function degToRad(deg) {
  return deg * (Math.PI / 180);
}
function calcularDistanciaEuclidiana(lat1, lon1, lat2, lon2) {
  const R = 6371;


  const lat1Rad = degToRad(lat1);
  const lon1Rad = degToRad(lon1);
  const lat2Rad = degToRad(lat2);
  const lon2Rad = degToRad(lon2);


  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;


  const x = deltaLon * Math.cos((lat1Rad + lat2Rad) / 2);
  const y = deltaLat;
  

  const distancia = Math.sqrt(x * x + y * y) * R;
  
  return distancia; 
}


export function determinate_short_rute(institutions, actual_location) {
  const { lat: actualLat, lng: actualLng } = actual_location;
  const graph = {};

  
  institutions.forEach((institucion, index) => {
    const { mapa } = institucion;
    const { lat, lng } = mapa;
    const distancia = calcularDistanciaEuclidiana(actualLat, actualLng, lat, lng);
    graph[`node_${index}`] = { dist: distancia, institution: institucion };
  });


  const shortestPaths = dijkstra(graph, `node_actual`);

  const orderedInstitutions = Object.values(shortestPaths).sort((a, b) => a.dist - b.dist);

  return orderedInstitutions.map(path => path.institution);
}