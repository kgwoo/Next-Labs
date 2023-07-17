"use client";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const CanvasView: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            draw(canvasRef.current);
        }
    }, [canvasRef]);

    useEffect(() => {
        console.log(divRef.current);
    }, [divRef]);

    const draw = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d");

        if (ctx) {
            ctx.beginPath();
            ctx.fillStyle = "blue";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };

    return (
        <CanvasViewLayout>
            <Canvas ref={canvasRef} />
            <Div ref={divRef}>canvas 체크</Div>
        </CanvasViewLayout>
    );
};

export default CanvasView;

const CanvasViewLayout = styled.div``;

const Canvas = styled.canvas`
    width: 500px;
    height: 500px;
`;

const Div = styled.div``;
