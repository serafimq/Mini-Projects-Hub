const scene = new THREE.Scene(); // scene 

// object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'purple' });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// camera 
const sizes = {
  width: 600,
  height: 600,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 1.1;
camera.position.x = 0.7;

scene.add(camera);

const canvas = document.querySelector('.canvas');

const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(sizes.height, sizes.width);
renderer.render(scene, camera);
