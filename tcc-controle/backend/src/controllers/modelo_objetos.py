import os
from time import sleep
import cv2
from ultralytics import YOLO
import sys

# GOMES
# Declarar paths e constantes
# MODEL_OBJECT_PATH = os.path.join("C:\\Users\\lgome\\OneDrive\\Documents",'detect_object.pt')
MODEL_OBJECT_PATH = os.path.join("C:\\Users\\lgome\\OneDrive\\Documents",'best_Obj_Comuns.pt')

OBJECT_THRESHOLD = 0.7

CLASS_NAME_OBJECT_DICT = {0: 'Caneca', 1:'Óculos', 2:'Fone'}


cap = cv2.VideoCapture(0)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

#load models
model_object = YOLO(MODEL_OBJECT_PATH)

sys.stdout = open('output2.txt', 'w')

while cap.isOpened():
    ret, frame = cap.read()

    # Make object detections
    object_results = model_object(frame)[0]

    for result in object_results.boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = result

        if score > OBJECT_THRESHOLD:
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 4)
            cv2.putText(frame, object_results.names[int(class_id)].upper(), (int(x1), int(y1 - 10)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)

            # Escrever o output no arquivo de texto
            class_name = object_results.names[int(class_id)].upper()

            if class_name.strip():  # Verifica se a string não está em branco após remover espaços em branco
                with open('output2.txt', 'a') as file:
                    file.write(class_name + '\n')

    # if len(object_results.names[int(class_id)])>0:
    #     cap.release()
    #     cv2.destroyAllWindows()    
        # sys.modules.clear()
        # sys.path.clear()
        # sys.stdout.close()

    cv2.imshow('Posicione o equipamento',  cv2.resize(frame, (800, 600)))

    if cv2.waitKey(10) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        sys.modules.clear()
        sys.path.clear()
        sys.stdout.close()
        break

