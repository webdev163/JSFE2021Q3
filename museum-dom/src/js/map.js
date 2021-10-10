import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGloYXJhYzY2NyIsImEiOiJja3VpaDdiazAwdDZ1MnFteTh6aDRtMnFwIn0.Qd5XA_H2Mfij2--Mu1eKfg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [2.3363, 48.86095],
  zoom: 15.77
});

new mapboxgl.Marker({ color: '#171717' })
  .setLngLat([2.3364, 48.86091])
  .addTo(map);
new mapboxgl.Marker({ color: '#757575' })
  .setLngLat([2.3333, 48.8602])
  .addTo(map);
new mapboxgl.Marker({ color: '#757575' })
  .setLngLat([2.3397, 48.8607])
  .addTo(map);
new mapboxgl.Marker({ color: '#757575' })
  .setLngLat([2.3330, 48.8619])
  .addTo(map);
new mapboxgl.Marker({ color: '#757575' })
  .setLngLat([2.3365, 48.8625])
  .addTo(map);

map.addControl(new mapboxgl.NavigationControl());
