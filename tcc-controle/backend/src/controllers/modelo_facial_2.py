import os
from time import sleep
import cv2
from ultralytics import YOLO
import sys

# GOMES
# Declarar paths e constantes
MODEL_FACE_CLASS_PATH = os.path.join("C:\\Users\\lgome\\OneDrive\\Documents", 'best_classificador_01.pt')
MODEL_FACE_DETECTION_PATH = os.path.join("C:\\Users\\lgome\\OneDrive\\Documents", 'best_detector_faces.pt')

THRESHOLD_DETECTION = 0.8

THRESHOLD = 0.9

print("carregando modelo de deteccao facial")
model_face_detection=YOLO(MODEL_FACE_DETECTION_PATH)

print("carregando modelo de classificacao facial")
model_face_class = YOLO(MODEL_FACE_CLASS_PATH)

cap = cv2.VideoCapture(0)

sys.stdout = open('output.txt', 'w')

while cap.isOpened():
    ret, frame = cap.read()
    
    img = frame

    # deteccao da face
    #print("Realizando a deteccao de face")
    results = model_face_detection(img)[0]

    class_name_dict = {0:'Julie', 1:'Lucas', 2:'Desconhecido'}

    if len(results) != 0:

        for result in results.boxes.data.tolist():
            x1, y1, x2, y2, score, class_id = result
            if score > THRESHOLD_DETECTION:
                #try:
                #print("Deteccao de face com sucesso")
                box = [x1, y1, x2, y2]

                crop_img =img[int(y1):int(y2), int(x1):int(x2)]

                crop_img = cv2.cvtColor(crop_img, cv2.COLOR_BGR2RGB)


                # classificacao de face
                #print("Realizando a identifica de face")
                results = model_face_class.predict(crop_img)

                for result in results:

                    probs = result.probs  

                    class_pred_id = probs.top1
                    class_pred_confianca = round(probs.top1conf.item(), 4)

                    if class_pred_confianca > THRESHOLD: 

                        cv2.rectangle(img, (int(x1), int(y1)), (int(x2), int(y2)), (0,255,0), 5)
                        cv2.putText(img, class_name_dict[int(class_pred_id)].upper()+ " " + str(class_pred_confianca), (int(x1), int(y1 - 10)),
                                    cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0,255,0), 5, cv2.LINE_AA)

                        class_name = class_name_dict[int(class_pred_id)].upper()

                        if class_name.strip():  # Verifica se a string não está em branco após remover espaços em branco
                            with open('output.txt', 'a') as file:
                                file.write(class_name + '\n')

            # if int(class_pred_id)<2:
            #     cap.release()
            #     cv2.destroyAllWindows()
            #     sys.modules.clear()
            #     sys.path.clear()
            #     sys.stdout.close()    

    else:
        print("Desconhecido")

    cv2.imshow('Posicione o seu rosto', cv2.resize(frame, (800, 600)))

    if cv2.waitKey(10) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        sys.modules.clear()
        sys.path.clear()
        sys.stdout.close()
        cap = ""
        break
    
