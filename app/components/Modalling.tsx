import { Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BookImage, X } from 'lucide-react-native'
import { useAuthStore } from '../store/auth'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';

type modalType = {
    modal: boolean,
    name: string,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    fetchPost: () => Promise<void>
}

type fileProp = {
  name: string,
  uri: string,
  type: string
}

export default function Modalling({modal, name, setModal, fetchPost}: modalType) {
    const [ isDisabled, setIsDisabled] = useState(false)
    const [ text, setText ] = useState('')
    const [ file, setFile ] = useState<fileProp | null>(null)

    const token = useAuthStore(state => state.token)
    const API_URL = process.env.EXPO_PUBLIC_API_URL
    
    const handleModal = () => {
      setModal(false)
    }

    const pickMedia = async () => {

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsMultipleSelection: true,
        allowsEditing: false,
        quality: 1,
        videoQuality: 1
      })

      if(!result.canceled) {
        const assets = result.assets[0]
        const fileUri = assets.uri
        const fileType = assets.mimeType || (assets.type === 'video' ? 'video/mp4' : 'image/jpeg')
        const fileName = assets.fileName || `posts_${Date.now()}.${assets.type === "video" ? "mp4" : "jpg"}`


        const fileObject = {
          name: fileName,
          type: fileType,
          uri: fileUri
        }
        console.log('Uploading file:', fileObject)
        setFile(fileObject)
       
      }

    }

    const addPost = async () => {
      const formData = new FormData()
      
      formData.append('text', text)

      if (file?.uri) {
        formData.append('file', {
          uri: file.uri,
          type: file.type,
          name: file.name,
        } as any); 
      }

      try { 
        const res = await axios.post(`${API_URL}/post`, formData, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        } )
        console.log(res.data.data)
        setText('')
        setFile(null)
        setModal(false)
        await fetchPost()
      }
      catch(err: any) {
        console.log(err.response?.data || err?.message)
      }
    }

    useEffect(() => {
      const isTextEmpty = text.trim() === ""
      const isFileEmpty = file === null

      setIsDisabled(isTextEmpty && isFileEmpty)
    }, [text, file])
    
  return (
      <Modal
      style={{flex: 1, padding: 10}} 
      visible={modal} 
      animationType='slide' 
      presentationStyle='pageSheet'
      >
        <View style={styles.container}>
            <X onPress={handleModal}/>
            <Text style={{fontSize: 18}}>Create Post</Text>
            <Pressable onPress={addPost}  disabled={isDisabled}>
                <Text style={{fontSize: 16, color: isDisabled ? '#dcdfe2' : 'black'}}>Post</Text>
            </Pressable>
        </View>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', padding: 10}}>
            <Image 
            style={styles.miniCon}
            source={require('../../assets/images/oye.jpg')}
            />
            <Text style={{fontWeight: '500', fontSize: 18}}>{name}</Text>
        </View>
        <View style={{padding: 10}}>
            <TextInput 
            style={{height: 100}}
            value={text}
            onChangeText={setText}
            multiline={true}
            placeholder="What's on your mind?"
            />
        </View>
        <Pressable onPress={pickMedia} style={styles.press}>
          <BookImage />
          <Text>Choose from gallery</Text>
        </Pressable>
      </Modal>
    
  )
}

const styles = StyleSheet.create({
    profileimg: {
        width: '100%',
        height: '100%',
        borderRadius: 25 
    },
    miniCon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      overflow: 'hidden',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#dcdfe2'
    },
    press: {
      padding: 10,
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#dcdfe2',
      shadowColor: 'gray',
      shadowOffset: {
        width: 25,
        height: 25
      },
      shadowOpacity: 1,
      shadowRadius: 15,
      elevation: 5
    }
})