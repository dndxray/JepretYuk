import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Camera.css";

import karina1 from "../assets/idols/karina/fotokarina1.png";
import karina2 from "../assets/idols/karina/fotokarina2.png";
import karina3 from "../assets/idols/karina/fotokarina3.png";
import karina4 from "../assets/idols/karina/fotokarina4.png";
import wonyoung1 from "../assets/idols/wonyoung/fotowonyoung1.png";
import wonyoung2 from "../assets/idols/wonyoung/fotowonyoung2.png";
import wonyoung3 from "../assets/idols/wonyoung/fotowonyoung3.png";
import wonyoung4 from "../assets/idols/wonyoung/fotowonyoung4.png";

function Camera() {


    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const templateRef = useRef(null);

    const TOTAL_PHOTOS = 4;


    const [photos, setPhotos] = useState([]);
    const [currentPhoto, setCurrentPhoto] = useState(1);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const selectedFrame =
        localStorage.getItem("selectedFrame");

    const idolPhotos = {
    framekarina: [
        karina1,
        karina2,
        karina3,
        karina4,
    ],

    framewonyoung: [
        wonyoung1,
        wonyoung2,
        wonyoung3,
        wonyoung4,
    ],
    };
    const currentIdolPhoto =
        idolPhotos[selectedFrame]?.[
        photos.length
    ];

    useEffect(() => {
        const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        } 
        catch (error) {
            console.error("Camera Error:", error);
        }
    };

    startCamera();
     }, []);

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const template = templateRef.current;

        if (!video || !canvas || !template) return;

    const width = video.videoWidth;
    const height = video.videoHeight;

    if (!width || !height) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    // mirror selfie
    ctx.save();

    ctx.scale(-1, 1);

    ctx.drawImage(
        video,
        -width,
        0,
        width,
        height
    );

    ctx.restore();

    // overlay idol
    ctx.drawImage(
        template,
        0,
        0,
        width,
        height
    );

    const imageData = canvas.toDataURL("image/png");

    setCapturedPhoto(imageData);
    };

    const usePhoto = () => {
        if (!capturedPhoto) return;

        const newPhotos = [...photos, capturedPhoto];

        setPhotos(newPhotos);
        setCapturedPhoto(null);

    if (newPhotos.length < TOTAL_PHOTOS) {
        setCurrentPhoto(newPhotos.length + 1);
    }
    };

    const retakePhoto = () => {
        setCapturedPhoto(null);
    };

    const resetPhotos = () => {
        setPhotos([]);
        setCapturedPhoto(null);
        setCurrentPhoto(1);
    };

    const goNext = () => {
        localStorage.setItem(
        "photos",
        JSON.stringify(photos)
    );

    navigate("/result");
    };

    return (
    <div className="camera-page">
        <h1 className="camera-title">Photobooth</h1>

        {photos.length < TOTAL_PHOTOS && (
        <h2>
            Foto {currentPhoto} dari {TOTAL_PHOTOS}
        </h2>
        )}

        {/* Kamera selalu tampil */}
        {photos.length < TOTAL_PHOTOS && (
        <>
            <div className="camera-container">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="camera-video"
            />

            <img
                ref={templateRef}
                src={currentIdolPhoto}
                alt="Idol"
                className="template-overlay"
            />
            </div>

            {!capturedPhoto && (
            <div className="button-group">
                <button
                className="btn btn-primary"
                onClick={takePhoto}
                >
                Take Photo 📸
                </button>

                <button
                className="btn btn-secondary"
                onClick={resetPhotos}
                >
                Reset
                </button>
            </div>
            )}
        </>
        )}

        {/* Preview */}
        {capturedPhoto && (
        <div className="complete-box">
            <h2>Preview Foto</h2>

            <img
            src={capturedPhoto}
            alt="preview"
            className="preview-image"
            />

            <div className="button-group">
            <button
                className="btn btn-secondary"
                onClick={retakePhoto}
            >
                Retake
            </button>

            <button
                className="btn btn-primary"
                onClick={usePhoto}>
                Gunakan Foto
            </button>
            </div>
        </div>
      )}

        {/* Foto yang sudah disimpan */}
        <div className="photo-grid">
        {photos.map((photo, index) => (
            <div
            key={index}
            className="photo-card"
          >
            <p>Foto {index + 1}</p>

            <img
                src={photo}
                alt={`photo-${index}`}
            />
            </div>
        ))}
        </div>

        {photos.length === TOTAL_PHOTOS && (
        <div className="complete-box">
            <h2>Semua foto sudah diambil</h2>

            <button
            className="generate-btn"
            onClick={goNext}
            >
            Next →
            </button>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="hidden-canvas"
      />
    </div>
  );
}

export default Camera;