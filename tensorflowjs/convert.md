# Convert the Pretrained Model

In this topic, we are going to convert a pre-trained model from Tensorflow Core to Tensorflow.JS. The model was an MLP model and trained on the MNIST dataset. For the training script and detail please refer to the [link](https://github.com/jiankaiwang/aiot/blob/master/tensorrt/trainingMNIST.md).

Before we start, please make sure you have installed the `tensorflowjs` first.

```sh
pip install tensorflowjs
```

## From the SavedModel Format

You can simply convert the savedmodel using the following command.

```sh
# mnist is a folder in savedmodel format
tensorflowjs_converter ./mnist ./mnist_tfjs
```

Other advanced parameters are the followings.

```sh
tensorflowjs_converter \
  --input_format=tf_saved_model \
  --output_node_names='outputs' \
  --saved_model_tags=serve \
  ./mnist \
  ./mnist_tfjs_2
```