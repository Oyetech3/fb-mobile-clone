import { Alert, Image, Pressable, SafeAreaView,  Text,  View } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import { Ellipsis, X } from 'lucide-react-native'
import axios from 'axios'

export default function OneStatus() {

    const [ showDelete, setShowDelete ] = useState(false)

    const { id, file} = useLocalSearchParams()
    const numId = Number(id)
    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const fileUrl = `${API_URL}/get_one/${id}`

    const isVideo = (filename: string) => {
        const ext = filename.split('.').pop()?.toLowerCase();
        return ['mp4', '3gpp', 'mov', 'mkv', 'avi', 'quicktime'].includes(ext || '');
    };
    const isVideoFile = isVideo(file as string)

    const player = useVideoPlayer(isVideoFile ? fileUrl : '' , player => {
        player.loop = true
        player.play()
    })

    const deleteStatus = async (del_id: number) => {
      Alert.alert("Confirm delete", "Are you sure you want to delete?", [
        {text: "Cancel", style: "cancel"}, 
        {
          text: "Delete", style: "destructive",
          onPress: async () => {
            try {
              const res = await axios.delete(`${API_URL}/delete_status/${del_id}`)
              router.replace('/')
              console.log(res.data.message)
            }
            catch {
              console.log("Error deleting the status")
            }
          }
        }
      ])
    } 

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flexDirection: 'row', justifyContent: "flex-end", gap: 20, padding: 10}}>
        <Ellipsis onPress={() => setShowDelete(!showDelete)} color={'white'} />
        <X onPress={() => router.back()} color={'white'} />
      </View>
      <Pressable onPress={() => deleteStatus(numId)} style={{
        backgroundColor: "white", width: 90, 
        paddingVertical: 5, position: 'absolute',
        top: 100, zIndex: 100,
        alignSelf: 'flex-end', marginRight: 10, 
        display: `${showDelete ? 'flex' : 'none'}`
        }}>
        <Text style={{textAlign: "center", fontSize: 18}}>Delete</Text>
      </Pressable>
      {
        isVideoFile ? 
        <VideoView 
        style={{width: '100%', height: '100%'}} 
        player={player} 
        allowsFullscreen 
        allowsPictureInPicture 
       
        /> : 
        <Image 
        style={{width: '100%', height: '100%'}}
        source={{uri: fileUrl}} 
        resizeMode='cover'
        />
      }
      
    </SafeAreaView>
  )
}
