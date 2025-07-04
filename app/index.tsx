import {  ActivityIndicator, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import axios from 'axios'
import { X } from 'lucide-react-native'
import { useAuthStore } from './store/auth'



export default function Index() {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ success, setSuccess ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ message, setMessage ] = useState('')
  const [layoutMounted, setLayoutMounted] = useState(false)

  const router = useRouter()
  const getToken = useAuthStore((state) => state.token)


  useEffect(() => {
    const timeout = setTimeout(() => {
      setLayoutMounted(true)
    }, 0)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (layoutMounted && getToken) {
      router.replace('/home')
    }
  }, [layoutMounted, getToken, router])

  if (!layoutMounted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  const handleSubmit = async () => {
    const API_URL = 'http://192.168.16.232:8000/api';

    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      })

      setSuccess(true)
      setError(false)
      setEmail('')
      setPassword('')
      console.log(res.data)

      const token = res.data.access_token
      useAuthStore.getState().setToken(token)

      router.push('/home')
    }
    catch(err: any) {
      console.log(err.response?.data);
      setSuccess(false)
      setError(true)
      setMessage(err.response?.data?.message || "Error occurred, please try again")
    }
   
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../assets/images/fb-image.png')} resizeMode='contain' accessibilityLabel='facebook' />
      </View>
      <KeyboardAvoidingView behavior='padding'>

        {
          error && !success &&
          <View style={styles.error}>
            <Text >{message}</Text>
            <X onPress={() => setError(false)} />
        </View>
        }

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder='Enter your email' placeholderTextColor={'#bec1c5'} value={email} onChangeText={setEmail}  />
          <TextInput style={styles.input} placeholder='Enter your password' placeholderTextColor={'#bec1c5'} value={password} onChangeText={setPassword} />
          <Pressable onPress={handleSubmit} style={styles.submit} >
            <Text style={styles.text}>Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <View>
        <Pressable onPress={() => router.push('/create')} style={styles.createContainer}>
          <Text style={styles.createText}>Create new account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 50
  },
  form: {
    flexDirection: 'column',
    gap: 20,
    paddingTop: 40,
    marginHorizontal: 10,
  },
  input: {
    borderColor: '#dcdfe2',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    height: 60,
    fontSize: 20,
  },
  submit: {
    backgroundColor: '#0765ff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  image: {
    width: '100%',
    height: 100
  },
  createContainer: {
    borderTopWidth: 2,
    borderColor: '#dcdfe2',
    marginTop: 30,
    paddingTop: 30,
    alignItems: 'center',
    marginHorizontal: 10
  },
  createText: {
    backgroundColor: '#42b729',
    width: 250,
    textAlign: 'center',
    color: 'white',
    paddingVertical: 20,
    borderRadius: 7,
    fontSize: 24,
    fontWeight: 'bold',
  },
  error: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#dc26267b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5
  },
  success: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#a7f1c2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5 
  },
})