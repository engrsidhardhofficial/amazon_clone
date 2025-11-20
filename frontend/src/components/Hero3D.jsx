import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
    const sphereRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        sphereRef.current.position.y = Math.sin(t / 1.5) / 2;
        sphereRef.current.rotation.z = t / 2;
    });

    return (
        <Sphere visible args={[1, 100, 200]} scale={2} ref={sphereRef}>
            <MeshDistortMaterial
                color="#bc13fe"
                attach="material"
                distort={0.5}
                speed={2}
                roughness={0.2}
            />
        </Sphere>
    );
};

const Hero3D = () => {
    return (
        <div className="h-[500px] w-full relative bg-gradient-to-b from-dark-bg to-[#1a1a1a]">
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-10 max-w-lg pointer-events-none">
                <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                    Future Commerce
                </h1>
                <p className="text-gray-300 text-xl">
                    Experience the next generation of shopping with immersive 3D interactions.
                </p>
            </div>

            <Canvas className="absolute inset-0">
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
