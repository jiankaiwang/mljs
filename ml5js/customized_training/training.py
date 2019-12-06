#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: jiankaiwang
"""

import tensorflow as tf
import tqdm
from dump_checkpoints import dump_checkpoints

# In[]

from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets("/Users/jiankaiwang/devops/tmp/MNIST_data", one_hot=True)

# In[]
  
def conv2d(input, weight_shape, bias_shape):
  in_count = weight_shape[0] * weight_shape[1] * weight_shape[2]
  w_init = tf.random_normal_initializer(stddev=(2.0/in_count)**0.5)
  b_init = tf.constant_initializer(value=0.)
  W = tf.get_variable(name="W", shape=weight_shape, initializer=w_init)
  b = tf.get_variable(name="b", shape=bias_shape, initializer=b_init)
  conv = tf.nn.conv2d(input, W, [1,1,1,1], padding="SAME")
  return tf.nn.relu(tf.nn.bias_add(conv, b))
  
def maxpool(input, k=2):
  return tf.nn.max_pool(input, ksize=[1,k,k,1], strides=[1,k,k,1], padding="SAME")
  
def mlplayer(input, weight_shape, bias_shape):
  weight_std = (2.0 / weight_shape[0]) ** 0.5
  w_init = tf.random_normal_initializer(stddev=weight_std)
  b_init = tf.constant_initializer(value=0.)
  W = tf.get_variable(name="W", shape=weight_shape, initializer=w_init)
  b = tf.get_variable(name="b", shape=bias_shape, initializer=b_init)
  return tf.nn.relu(tf.nn.bias_add(tf.matmul(input, W), b))
  
def inference(input):
  x = tf.reshape(input, [-1, 28, 28, 1])
  
  with tf.variable_scope("conv_1"):
    conv_1 = conv2d(x, [5, 5, 1, 32], [32])  # conv_1 : 28 x 28 x 32
    pool_1 = maxpool(conv_1)                 # pool_1 : 14 x 14 x 32
    
  with tf.variable_scope("conv_2"):
    conv_2 = conv2d(pool_1, [5, 5, 32, 16], [16])  # conv_2 : 14 x 14 x 16
    pool_2 = maxpool(conv_2)                       # pool_2 : 7 x 7 x 16
  
  with tf.variable_scope("fc"):
    pool_2_flat = tf.reshape(pool_2, [-1, 7*7*16])
    fc_1 = mlplayer(pool_2_flat, [7*7*16, 784], [784])
    fc_dropout = tf.nn.dropout(fc_1, keep_prob=keep_prob)
    
  with tf.variable_scope("out"):
    out = mlplayer(fc_dropout, [784, 10], [10])
    
  return out


# In[]
  
def loss(output, y):
  cross_entropy = tf.nn.softmax_cross_entropy_with_logits_v2(logits=output, labels=y)
  loss = tf.reduce_mean(cross_entropy)
  return loss

def training(loss, global_step):
  tf.summary.scalar("loss", loss)
  optimizer = tf.train.GradientDescentOptimizer(learning_rate=learning_rate)
  train_opt = optimizer.minimize(loss, global_step=global_step)
  return train_opt

def testing(output, y):
  compare = tf.equal(tf.argmax(output, axis=1), tf.argmax(y, axis=1))
  accuracy = tf.reduce_mean(tf.cast(compare, tf.float32))
  tf.summary.scalar("eval", accuracy)
  
  return accuracy

# In[]

learning_rate = 1e-2
training_epochs = 10
batch_size = 64
display_step = 2

# In[]

with tf.Graph().as_default():
  with tf.variable_scope("dcnn"):
    x = tf.placeholder("float", [None, 784])
    y = tf.placeholder("float", [None, 10])
    keep_prob = tf.placeholder_with_default(1.0, shape=())
    
    global_step = tf.Variable(0, name="global_step", trainable=False)
    
    output = inference(x)
    loss_value = loss(output, y)
    train_opt = training(loss_value, global_step)
    testing_res = testing(output, y)
    
    summary = tf.summary.merge_all()
    saver = tf.train.Saver()
    
    with tf.Session() as sess:
      summary_writer = tf.summary.FileWriter("./ckpts", graph = sess.graph)
      sess.run(tf.global_variables_initializer())
      
      for i in tqdm.tqdm(range(0, training_epochs)):
        avg_loss = 0.
        total_batch = int(mnist.train.num_examples / batch_size)
        
        for idx in range(total_batch):
          batch_x, batch_y = mnist.train.next_batch(batch_size=batch_size)
          
          sess.run(train_opt, feed_dict={x:batch_x, y:batch_y})
          batch_loss = sess.run(loss_value, feed_dict={x:batch_x, y:batch_y, keep_prob:0.5})
          
        if i % display_step == 0:
          test_x, test_y = mnist.validation.images, mnist.validation.labels
          acc = sess.run(testing_res, feed_dict={x: test_x, y: test_y, keep_prob:1.0})
          print("Accuracy: ", acc)
        
          summary_str = sess.run(summary, feed_dict={x: test_x, y: test_y})
          summary_writer.add_summary(summary_str, sess.run(global_step))
          
          saver.save(sess, "./ckpts/ckpts", global_step=global_step)
          
      saver.save(sess, "./ckpts/ckpts")
          
      test_x, test_y = mnist.validation.images, mnist.validation.labels
      acc = sess.run(testing_res, feed_dict={x: test_x, y: test_y})
      print("Accuracy (Latest): ", acc)

    print("Training complete.")
  
# In[]

# dump checkpoints to folder
dump_checkpoints("./ckpts/ckpts", "dump_ckpts")









