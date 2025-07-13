import { Image,  Pressable,  View } from 'react-native'
import React from 'react'
import { useVideoPlayer, VideoView } from 'expo-video';
import { router } from 'expo-router';

interface Data {
    id: number,
    file: string
}   
  
export default function StatusItem ({ item, styles }: {item: Data, styles: any})  {

  const isVideo = (filename: string) => {
      const ext = filename.split('.').pop()?.toLowerCase();
      return ['mp4', '3gpp', 'mov', 'mkv', 'avi', 'quicktime'].includes(ext || '');
    };

  const fileUrl = `http://172.20.10.8:8000/api/mediastatus/${item.file}`
  const isVideoFile = isVideo(item.file);

  const player = useVideoPlayer(isVideoFile ? fileUrl : '', (player) => {
      if (isVideoFile) {
      player.loop = true;
      player.staysActiveInBackground = false
      player.muted = true
      player.play();
      }
  });


  return (
      <View style={[styles.statusBox, styles.back]}>
        <Pressable onPress={() => router.push(`/components/${item.id}?file=${item.file}`)}>
        {
            isVideoFile ? 
            <VideoView 
            style={[styles.statusImage,]}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            startsPictureInPictureAutomatically
            nativeControls={true}
            contentFit='cover'
            showsTimecodes={false}
            /> : 
            <Image 
            style={styles.statusImage}
            source={{uri: fileUrl}} 
            resizeMode='cover'
            accessibilityLabel='profile'
            />
        }
        
            <View style={styles.smallCon}>
                {
                isVideoFile ? 
                <Image 
                style={styles.smallImg}
                source={require("../../assets/images/oye.jpg")}
                resizeMode='cover'
                /> : 
                <Image 
                style={styles.smallImg}
                source={{uri: fileUrl}}
                resizeMode='cover'
                />
                }
            </View>
        </Pressable>
      </View>
  );
};

