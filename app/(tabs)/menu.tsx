import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useAuthStore } from '../store/auth'
import axios from 'axios'
import { useRouter } from 'expo-router'

export default function Menu() {

  const token = useAuthStore((state) => state.token)
  const setToken = useAuthStore((state) => state.setToken)

  const router = useRouter()

  const logout = async () => {
    const API_URL = 'http://192.168.16.232:8000/api';

    try {
      const res = await axios.post(`${API_URL}/logout`, {}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      console.log(res.data.message)

      
    }
    catch(err: any) {
      console.log(err.response?.data)
    }
    
    setToken(null)
    router.replace('/')
  }

  return (
    <SafeAreaView>
      <Pressable style={styles.button} onPress={logout} >
        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0765ff',
    padding: 10,
    width: 150,
    margin: 10,
    borderRadius: 5
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  }
})