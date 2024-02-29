import * as THREE from 'three';
import * as dat from 'lil-gui'; // для налаштування і відладки

const gui = new dat.GUI({ closeFolders: true });

const group = new THREE.Group();
const geometries = [
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.ConeGeometry(1, 2, 32, 1),
	new THREE.RingGeometry(0.5, 1, 16),
	new THREE.TorusGeometry(1, 0.5, 16, 100),
	new THREE.DodecahedronGeometry(1, 0),
	new THREE.SphereGeometry(1, 32, 16),
	new THREE.TorusKnotGeometry(1, 0.25, 100, 16, 5),
	new THREE.OctahedronGeometry(1, 0),
	new THREE.CylinderGeometry(0.5, 1, 2, 16, 4),
];

let index = 0;
export const parameters = {
	color: 0x3e329a,
};

for (let i = -5; i <= 5; i += 5) {
	for (let j = -5; j <= 5; j += 5) {
		const material = new THREE.MeshBasicMaterial({
			color: parameters.color,
			wireframe: true,
		});
		const mesh = new THREE.Mesh(geometries[index], material);
		const guiScaleFolder = gui.addFolder('Scale');
		guiScaleFolder
			.add(mesh.scale, 'x')
			.min(0)
			.max(5)
			.step(0.1)
			.name('Box scale x');
		guiScaleFolder
			.add(mesh.scale, 'y')
			.min(0)
			.max(5)
			.step(0.1)
			.name('Box scale y');
		guiScaleFolder
			.add(mesh.scale, 'z')
			.min(0)
			.max(5)
			.step(0.1)
			.name('Box scale z');
		gui.add(mesh, 'visible');
		gui.add(material, 'wireframe');
		gui.addColor(parameters, 'color').onChange(() => {
			material.color.set(parameters.color);
		});

		mesh.position.set(i, j, 10);
		mesh.index = index;
		mesh.baseColor = parameters.color;
		mesh.basePosition = new THREE.Vector3(i, j, 10);
		group.add(mesh);
		index += 1;
	}
}

export default group;
