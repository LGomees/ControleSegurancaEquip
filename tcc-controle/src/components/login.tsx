import React, { useEffect, useState } from 'react'

import { WebcamCapture } from './webcam'

export function Login() {
    return (
        <div className="headerContainer">
            <WebcamCapture></WebcamCapture>
        </div>
    );
}