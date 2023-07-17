"use client";
import React, { useState, useLayoutEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Face from "../../../public/face.png";

const CanvasImageView: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const draw = useCallback((canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d");

        if (ctx) {
            if (ctx) {
                const img = new Image();
                img.src = Face.src;

                img.onload = () => {
                    canvas.width = 500;
                    canvas.height = 500;
                    ctx.drawImage(img, 0, 0);
                    applyBlurEffect(canvas, ctx, 100, 100, 200, 200, 20);
                    setIsLoading(false);
                };
            }
        }
    }, []);

    const applyBlurEffect = (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number
    ) => {
        const imageData = ctx.getImageData(x, y, width, height);
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
            tempCanvas.width = width;
            tempCanvas.height = height;
            tempCtx.putImageData(imageData, 0, 0);
            tempCtx.filter = `blur(${radius}px)`;
            tempCtx.drawImage(tempCanvas, 0, 0);
            ctx.drawImage(tempCanvas, x, y);
        }
    };

    const getPixelValue = (canvas: HTMLCanvasElement, x: number, y: number): number[] | null => {
        const ctx = canvas.getContext("2d");

        if (ctx) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const { data } = imageData;
            const pixelIndex = (y * canvas.width + x) * 4;

            if (pixelIndex >= 0 && pixelIndex < data.length) {
                const pixelValues = [
                    data[pixelIndex], // Red
                    data[pixelIndex + 1], // Green
                    data[pixelIndex + 2], // Blue
                    data[pixelIndex + 3], // Alpha
                ];

                return pixelValues;
            }
        }

        return null;
    };

    useLayoutEffect(() => {
        if (canvasRef.current) {
            draw(canvasRef.current);
        }
    }, [draw]);

    return (
        <CanvasViewLayout>
            {isLoading && <Loader>...Loading</Loader>}
            <ImageLayout>
                <Dot />
                <Canvas ref={canvasRef} />
            </ImageLayout>
            <div
                onClick={() => {
                    if (canvasRef.current) {
                        const pixelValue = getPixelValue(canvasRef.current, 250, 350);
                        console.log("픽셀밸류", pixelValue);
                    }
                }}>
                픽셀 가져오기
            </div>
        </CanvasViewLayout>
    );
};

export default CanvasImageView;

const CanvasViewLayout = styled.div``;

const ImageLayout = styled.div`
    position: relative;
`;

const Dot = styled.div`
    position: absolute;
    left: 250px;
    top: 350px;
    width: 5px;
    height: 5px;
    background-color: red;
`;

const Canvas = styled.canvas`
    width: 500px;
    height: auto;
`;

const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
