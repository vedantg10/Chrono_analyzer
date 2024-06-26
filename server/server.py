from flask import Flask, request
import fastai.vision as fastai

app = Flask(__name__)

CLASSIFIER = fastai.load_learner("./models", "classifier.pkl")

@app.route('/classify', methods=['POST', "OPTIONS"])
def classify():
    files = request.files
    print (files['file'])
    image = fastai.image.open_image(files['file'])
    prediction = CLASSIFIER.predict(image)
    print (prediction)
    return {
        "brandPrediction": sorted(
        list(zip(
            CLASSIFIER.data.classes,
        [round(x,4) for x in map(float, prediction[2])]
        )), key=lambda p:p[1],
        reverse=True

        )
    }
# def home():
#     return "hello world"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)