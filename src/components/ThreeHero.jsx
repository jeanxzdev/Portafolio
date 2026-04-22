import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const NeonEightFiber = ({ index, scrollProgress, color }) => {
  const lineRef = useRef();
  const segments = 120;

  const { phase, speed, widthVar } = useMemo(() => ({
    phase: Math.random() * Math.PI * 2,
    speed: 2.5 + Math.random() * 0.35,
    widthVar: 0.8 + Math.random() * 0.6
  }), []);

  const points = useMemo(() => Array.from({ length: segments + 1 }, () => new THREE.Vector3()), []);
  const flattenedPoints = useMemo(() => new Float32Array(points.length * 3), [points]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.getElapsedTime();
    const morph = scrollProgress;
    const scaleFactor = 1 - (scrollProgress * 0.5);

    const eightHeight = 11;
    const eightWidth = 6 * widthVar;
    const sphereRadius = 3.5;

    points.forEach((p, i) => {
      const t = (i / segments) * Math.PI * 2 + (time * speed + phase) * 0.1;

      // Geometría Ocho (Viviani)
      const x8 = Math.sin(t) * eightWidth * scaleFactor;
      const y8 = (Math.sin(t) * Math.cos(t)) * eightHeight * scaleFactor;
      const z8 = Math.cos(t) * 3 * scaleFactor;

      // Geometría Esfera
      const az = t + time * 0.2;
      const pol = Math.acos(1 - (2 * i) / segments);
      const xS = sphereRadius * Math.sin(pol) * Math.cos(az) * scaleFactor;
      const yS = sphereRadius * Math.sin(pol) * Math.sin(az) * scaleFactor;
      const zS = sphereRadius * Math.cos(pol) * scaleFactor;

      flattenedPoints[i * 3] = THREE.MathUtils.lerp(x8, xS, morph);
      flattenedPoints[i * 3 + 1] = THREE.MathUtils.lerp(y8, yS, morph);
      flattenedPoints[i * 3 + 2] = THREE.MathUtils.lerp(z8, zS, morph);
    });

    lineRef.current.geometry.setPositions(flattenedPoints);
  });

  return (
    <Line ref={lineRef} points={points} color={color} lineWidth={1.8} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
  );
};

const ThreeHero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = 400;
      setScrollProgress(Math.min(scrollY / threshold, 1));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <div style={{
      position: 'fixed', // Clavado a la ventana
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1, // Cambia a 1 si sigue sin verse para probar si es el fondo
      backgroundColor: '#03000a',
      pointerEvents: 'none',
      overflow: 'hidden',
      display: 'block'
    }}>
      <Canvas gl={{ antialias: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 22]} fov={35} />
        <color attach="background" args={['#03000a']} />

        <group position={[10, -1.4, -5.2]} rotation={[0.2, 0, 0.6]}>
          {Array.from({ length: 30 }).map((_, i) => (
            <NeonEightFiber
              key={i}
              index={i}
              scrollProgress={scrollProgress}
              color={i % 2 === 0 ? '#a855f7' : '#6366f1'}
            />
          ))}
        </group>

        {/* Glow de fondo */}
        <mesh position={[8, 0, -10]}>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial color="#2e1065" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default ThreeHero;