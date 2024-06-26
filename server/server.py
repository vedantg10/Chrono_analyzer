from flask import Flask, request
import fastai.vision as fastai

app = Flask(__name__)

CLASSIFIER = fastai.load_learner("./models", "classifier.pkl")

@app.route('/classify')
def classify():
    image = fastai.image.open_image("./seiko-monster.jpg")
    prediction = CLASSIFIER.predict(image)
    print (prediction[0])
    return {
        "brandPrediction": []
    }
# def home():
#     return "hello world"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)