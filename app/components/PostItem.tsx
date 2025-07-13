import { Image,  View } from 'react-native'
import React from 'react'
import { useVideoPlayer, VideoView } from 'expo-video'

interface Data {
    id: number,
    file: string
}
export default function PostItem({item}: {item: Data, }) {
    
    const isVideo = (filename: string) => {
        const ext = filename.split('.').pop()?.toLowerCase()
        const videoTypes = ["mp4", "3gpp", "mkv", "avi", "quicktime", "mov"]
        return videoTypes.includes(ext || "")
    }
    
    const fileUrl = `http://172.20.10.8:8000/api/media/${item.file}`
    const isVideoFile = isVideo(fileUrl)

    const player = useVideoPlayer(isVideoFile ? fileUrl : "", player => {
        if(isVideoFile) {
            player.loop = true
            player.muted = true
            player.play()
        }
    })

  return (
    <View>
      {
        isVideoFile ? 
        <VideoView
        style={{width: '100%', height: 400}}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls= {true}
        contentFit='cover'
         /> : 
         <Image 
        style={{width: '100%', height: 500}}
        source={{uri: fileUrl}}
        resizeMode='cover'
        /> 
      }
    </View>
  )
}
