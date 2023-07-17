import os
import cv2
from ultralytics import YOLO
import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
import torch
import sys

# GOMES
# Declarar paths e constantes
MODEL_FACE_PATH = os.path.join("C:\\Users\\lgome\\OneDrive\\Documents", 'best_facial.pt')
# MODEL_OBJECT_PATH = os.path.join("C:\\Users\\lgome\\OneDrive\\Documents", 'best_object.pt')
# MODEL_OBJECT_PATH = os.path.join('.', 'runs', 'detect', 'train10', 'weights', 'best.pt')

FACE_THRESHOLD = 0.7
# OBJECT_THRESHOLD = 0.7

CLASS_NAME_FACE_DICT = {0: 'Julie', 1: 'Lucas'}
# CLASS_NAME_OBJECT_DICT = {0: 'Mug', 1: 'Glasses', 2: 'Headphones'}

cap = cv2.VideoCapture(0)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# load models
model_face = YOLO(MODEL_FACE_PATH)
# model_object = YOLO(MODEL_OBJECT_PATH)

sys.stdout = open('output.txt', 'w')

while cap.isOpened():
    ret, frame = cap.read()

    # Make face detections
    face_results = model_face(frame)[0]

    for result in face_results.boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = result

        if score > FACE_THRESHOLD:
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (255, 0, 0), 4)
            cv2.putText(frame, face_results.names[int(class_id)].upper(), (int(x1), int(y1 - 10)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.3, (255, 0, 0), 3, cv2.LINE_AA)
            
            # Escrever o output no arquivo de texto
            with open('output.txt', 'a') as file:
                file.write(face_results.names[int(class_id)].upper() + '\n')

    # # Make object detections
    # object_results = model_object(frame)[0]

    # for result in object_results.boxes.data.tolist():
    #     x1, y1, x2, y2, score, class_id = result

    #     if score > OBJECT_THRESHOLD:
    #         cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 4)
    #         cv2.putText(frame, object_results.names[int(class_id)].upper(), (int(x1), int(y1 - 10)),
    #                     cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)
    #
    #         # Escrever o output no arquivo de texto
    #         with open('output.txt', 'a') as file:
    #             file.write(object_results.names[int(class_id)].upper() + '\n')

    cv2.imshow('Posicione o seu rosto', cv2.resize(frame, (800, 600)))

    if cv2.waitKey(10) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break

sys.stdout.close()