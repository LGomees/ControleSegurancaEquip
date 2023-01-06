import React, { useEffect, useState } from 'react'

import { WebcamCapture } from './webcam'

export function Home() {
    return (
        <div className="headerContainer">
            <WebcamCapture></WebcamCapture>
        </div>
    );
}