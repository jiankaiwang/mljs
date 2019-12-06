#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: jiankaiwang
"""

import os
import tensorflow as tf

# In[]

dump_ckpt_path = os.path.join(".","dump_ckpts")
variable_filename = "dcnn_conv_1_W"
variable_filepath = os.path.join(dump_ckpt_path, variable_filename)

assert os.path.exists(dump_ckpt_path), "dump path is not found"

# In[]

def dump_value(binary_filepath):
  with open(binary_filepath, "rb") as fin:
    fileContent = fin.read()
  return fileContent 
  
fc = dump_value(variable_filepath)
decode_data = tf.io.decode_raw(fc, tf.float32)

# In[]

with tf.Session() as sess:
  sess.run(tf.global_variables_initializer())
  decode_variables = sess.run(decode_data)
  
print(decode_variables.shape)
print(decode_variables.shape[0] == 5*5*1*32)