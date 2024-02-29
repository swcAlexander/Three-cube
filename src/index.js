import * as THREE from 'three';
import TWEEN from 'three/examples/jsm/libs/tween.module';
import group from './group';
import init from './init';
import Stats from 'stats.js'; // для відслідковування FPS

import './style.css';

const { sizes, camera, scene, canvas, controls, renderer } = init();

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

camera.position.z = 40;

scene.add(group);

const clock = new THREE.Clock();
let activeindex = -1;

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const handleClick = (event) => {
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(pointer, camera);
	const intersections = raycaster.intersectObjects(group.children);

	if (activeindex !== -1) {
		resetActive();
	}

	for (let f = 0; f < intersections.length; f += 1) {
		intersections[f].object.material.color.set('purple');
		activeindex = intersections[f].object.index;

		new TWEEN.Tween(intersections[f].object.position)
			.to({ x: 0, y: 0, z: 25 }, Math.random() * 1000 + 1000) // Тут прописуємо швидкість анімаці і куди вона буде відбуватись
			.easing(TWEEN.Easing.Exponential.InOut) // тут прописуємо анімацію. Можна вибрати іншу
			.start();
	}
};

const resetActive = () => {
	group.children[activeindex].material.color.set(
		group.children[activeindex].material.color.baseColor,
	);
	new TWEEN.Tween(group.children[activeindex].position)
		.to(
			{
				x: group.children[activeindex].basePosition.x,
				y: group.children[activeindex].basePosition.y,
				z: group.children[activeindex].basePosition.z,
			},
			Math.random() * 1000 + 1000,
		)
		.easing(TWEEN.Easing.Exponential.InOut)
		.start();
	activeindex = -1;
};

const tick = () => {
	stats.begin();
	const delta = clock.getDelta();
	if (activeindex !== -1) {
		group.children[activeindex].rotation.y += delta * 0.5;
	}
	controls.update();
	TWEEN.update();
	renderer.render(scene, camera);
	stats.end();
	window.requestAnimationFrame(tick);
};
tick();

window.addEventListener('click', handleClick);

/** Базовые обработчики событий длы поддержки ресайза */
window.addEventListener('resize', () => {
	// Обновляем размеры
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Обновляем соотношение сторон камеры
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Обновляем renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.render(scene, camera);
});
// Вішаємо подію подвійного клацу для переходу на повноекранний режим і навпаки
window.addEventListener('dblclick', () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});
