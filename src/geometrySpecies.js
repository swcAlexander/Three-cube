// Головні геометрії

// КУБ: приймає головні три аргументи: розміри сторін x, y, z. Інші аргументи - кількість вершин на кожній з осей, що додає краси візуального зображення, але жере ресурси
// const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);

// КОЛО, або диск. Приймає 4 параметри (перші два обов'язкові) : радіус ,кількість сегментів, початок кута,  протяжність кута (2 * Math.PI - це повне коло)
// const geometry = new THREE.CircleGeometry(1, 20, 0, Math.PI);

// ПЛОСКІСТЬ. Приймає 2 базові параметри : ширина, висота. Можемо збільшити кількість сегментів (як і в кубі)
// const geometry = new THREE.PlaneGeometry(1, 1, 10, 10);

// КОНУС. Приймає три базові параметри: радіус, висота, кількість сегментів. Інші параметри - кількість поділів конуса, закрита(false),
// чи відкрита(true) форма. Як і в колі, можемо вказати початок кута,  протяжність кута (2 * Math.PI - це повне коло)
// const geometry = new THREE.ConeGeometry(1, 2, 20, 4, true, 0, Math.PI);

// ЦИЛІНДР. Приймає 3 базові: верхній, нижній радіуси, висота. Допоміжні: Кількість сегментів по радіусі, по висоті.
// По аналогі з конусом ,ми можемо прибрати верхню/нижню сторони, та додати початок та протяжність кута.
// const geometry = new THREE.CylinderGeometry(1, 1, 2, 64, 4, true, 0, Math.PI);

// КРУГ ( або кільце). Три основних ахгументи: Перший радіус, рдугий радіус, кількість сегментів. Приймає також кількість сегментів між сегментами та властивості кола.
// const geometry = new THREE.RingGeometry(0.5, 1, 32, 10, 0, Math.PI);

// ТОР. Приймає : радіус загальний, радіус труби, кількість сегментів,  кількість сегментів між сегментами, властивості кола (без позначення початку кута)
// const geometry = new THREE.TorusGeometry(0.5, 0.2, 32, 100, Math.PI);

// ВУЗОЛ. Має властивості тора: радіус загальний, радіус труби, кількість елементів (100), кількість радіальних елементів.
// Нові параметри: кількіть вузлів, кількість вершин
// const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 200, 32, 1, 5);

// ДЕДЕКАЙДЕР та схожі геометрії.  Приймає радіус і кількість сегментів у кожній грані (за замовчуванням 0). Чим більша кількість сегментів, тим більше схоже на круг
// const geometry = new THREE.DodecahedronGeometry(1, 5); // об'єкт з 12-ма гранями
// const geometry = new THREE.OctahedronGeometry(1, 0); // здвоєна  чотиригранна піраміда
// const geometry = new THREE.TetrahedronGeometry(1, 0); // здвоєна  тригранна піраміда
// const geometry = new THREE.IcosahedronGeometry(1, 0); // фігура з трикутніків

// СФЕРА. Приймає радіус, кльіксть сегментів по колу, кількість сегментів по ширині, властивості кола ( при чому двічі)
// const geometry = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI / 2, 0, Math.PI / 2,);

// Ми можемо створювати геометрію самостійно, або підгружати з відмовідих програм. Для цього потрібно задати вершини нашої фігури, їх кліькість.
const geometry = new THREE.BufferGeometry();
// const points = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]); // задані параметри розташуваня вершин
const amount = 50;

const points = new Float32Array(amount * 3 * 3);
for (let i = 0; i < amount * 3 * 3; i++) {
	points[i] = (Math.random() - 0.5) * 4;
} // наб'ємо точками масив, після чого створимо трикутники
const pointsBuffer = new THREE.BufferAttribute(points, 3);
geometry.setAttribute('position', pointsBuffer);
