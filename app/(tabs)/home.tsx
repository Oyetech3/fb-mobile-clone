import { Alert, FlatList, Image, ImageSourcePropType, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
//import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { BadgeCheck, BookImage, Ellipsis, Forward, Globe, Heart, MessageCircle, MessageCircleIcon, Plus, Search, ThumbsUp, X } from 'lucide-react-native'
import axios from 'axios'
import { useAuthStore } from '../store/auth'
import StatusItem from '../components/StatusItem';
import Modalling from '../components/Modalling'
import PostItem from '../components/PostItem'

interface Data {
  id: number,
  file: string,
  text: string
}

interface postDatas {
  name: string,
  post: string,
  profile: ImageSourcePropType,
  image: ImageSourcePropType,
  likes: string,
  comments: string,
  time: string,
  shares: string
}

export default function Home() {

  const [ status, setStatus ] = useState<Data[]>([])
  const [ isModal, setIsModal ] = useState(false)
  const [ newPost, setNewPost ] = useState<Data[]>([])

  const token = useAuthStore((state) => state.token)
  const fullName = useAuthStore((state) => state.name)
  
  const API_URL = process.env.EXPO_PUBLIC_API_URL

  const pickStory = async () => {
    //const result = await DocumentPicker.getDocumentAsync({})
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: false,
      quality: 1
    })

    if(!result.canceled) {
      const assets = result.assets[0]
      const fileUri = assets.uri
    
      const formData = new FormData()
    
      const fileObject = {
        uri: fileUri,
        type: assets.mimeType || (assets.type === 'video' ? 'video/mp4' : 'image/jpeg'),
        name: assets.fileName || `upload_${Date.now()}.${assets.type === 'video' ? 'mp4' : 'jpg'}`
      }
      
      formData.append('file', fileObject as any)
      
      console.log('Uploading file:', fileObject)
      
      try {
        const res = await axios.post(`${API_URL}/status`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
        })
        console.log("response: ", res.data)
        await fetchStatus()
      }
      catch(err: any){
        console.log("error: ", err.response?.data || err.message)
      }
    }
  }

  const fetchStatus = useCallback( async () => {
    try {
      const res = await axios.get(`${API_URL}/status`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      console.log(res.data.message)
      const data = res.data.data
      setStatus(data)
    }
    catch(err: any) {
      console.log("error: ", err.response?.data || err.message)
    }
  }, [token, API_URL]) 
  
  const fetchPost = useCallback( async () => {
    try {
      const res = await axios.get(`${API_URL}/post`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      console.log(res.data.message)
      const data = res.data.data
      setNewPost(data)
    }
    catch(err: any) {
      console.log("error: ", err.response?.data || err.message)
    }
  }, [token, API_URL]) 

  const deletePost = async (id: number) => {
    Alert.alert("Confirm delete", "Are you sure you to delete?", [
      {text: "Cancel", style: "cancel"},
      {text: "Delete",
       style:"destructive",
       onPress: async () => {
        try {
          const res = await axios.delete(`${API_URL}/delete_post/${id}`)
          console.log(res.data.message)
          await fetchPost()
        }
        catch {
          console.log("Failed to delete post")
        } 
       }
      },
    ])
  }

  useEffect(() => {
    fetchStatus()
    fetchPost()
  }, [fetchStatus, fetchPost])

  console.log(newPost)

  const statuses = [
    require('../../assets/images/messi.jpeg'),
    require('../../assets/images/leo.jpg'),
    require('../../assets/images/leoo.jpg'),
    require('../../assets/images/abu.jpg'),
    require('../../assets/images/bro.jpg')
  ]

  const posts : postDatas[] = [
    {
      profile: require('../../assets/images/fabrizo.jpg'),
      name: "Fabrizio Romano",
      image: require('../../assets/images/fabrizopost.jpg'),
      time: "20m . ",
      post: "🚨🚨 𝐑𝐄𝐕𝐄𝐀𝐋𝐄𝐃: Ansu Fati SIGNED new deal at Barcelona until JUNE 2028 before leaving for AS Monaco deal. 💙❤️‍🔥",
      likes: "38",
      comments: "9",
      shares: "5"
    },
    {
      profile: require('../../assets/images/rs.jpg'),
      name: "The Real Ball",
      image: require('../../assets/images/rspost.jpg'),
      time: "1h . ",
      post: "Absolutely awful news coming out this morning. I can’t believe I’m even typing this. Diogo Jota has sadly passed away in a car accident along with his brother. 💔 Only won the nations league a few weeks ago, and got married this week. Rest in perfect peace. Sending love to all his family, friends & team mates. ❤️🙏🏼",
      likes: "48",
      comments: "19",
      shares: "52"
    },
    {
      profile: require('../../assets/images/asianpro.jpg'),
      name: "My Asian Drama",
      image: require('../../assets/images/asian.jpg'),
      time: "8m. ",
      post: "Kuyun's analysis of ratings for the first half of the year shows that the drama '#SiJin' featuring #JingTian and #ZhangWanyi ranks second; it is also the most-watched historical drama on #Dragon Satellite TV in the first half of the year. #Dragon TV's main target audience, which follows the most successful series, consists predominantly of viewers who prefer contemporary dramas. '#SiJin' has ranked second in the #Kuyun ratings for two consecutive quarters. The ratings curve for drama series in the first half of the year shows that '#SiJin' gradually gained ratings after the series change. The ratings started high but experienced a slight decline in the interim before gaining momentum in the second half of the broadcast, reaching #Kuyun's peak ratings of over 0.5 for five consecutive days, with most of the peak ratings concentrated in the second half of the storyline.",
      likes: "8",
      comments: "2",
      shares: "3"
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headCon}>
          <Image 
          style={styles.img}
          source={require('../../assets/images/fb-image.png')} 
          accessibilityLabel='fb-image' resizeMode='contain' 
          />
          <View style={styles.headIcons}>
            <Plus onPress={() => setIsModal(prev => !prev)} color={'black'} />
            <Search color={'black'} />
            <MessageCircle />
          </View>
        </View>
        <View style={styles.profileCon}>
          <View style={styles.miniCon}>
            <Image 
            style={styles.profileimg} 
            source={require('../../assets/images/oye.jpg')} 
            resizeMode='cover' 
            accessibilityLabel='profile' 
            />
          </View>
          <Pressable onPress={() => setIsModal(prev => !prev)} style={styles.inputCon}>
            <Text style={styles.input}> 
            What&apos;s on your mind 
            </Text>
            <BookImage color={"black"} />
          </Pressable>
        </View>
        <ScrollView horizontal={true} style={styles.statusContainer} showsHorizontalScrollIndicator={false}>
          
          <Pressable onPress={pickStory} style={styles.statusBox}>
            <Image 
            style={styles.statusImg}
            source={require('../../assets/images/oyekola.jpg')} 
            resizeMode='cover'
            accessibilityLabel='profile'
            />
            <View style={styles.plusContainer}>
              <Plus size={30} style={styles.plus} />
            </View>
            <View style={styles.statusText}>
              <Text style={{fontWeight: 'bold'}}>Create</Text>
              <Text style={{fontWeight: 'bold'}}>story</Text>
            </View>
          </Pressable>

          <FlatList  
          data={status} 
          scrollEnabled={false}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <StatusItem item={item} styles={styles} />
          )} />

          <FlatList
          data={statuses}
          scrollEnabled={false}
          horizontal
          renderItem={({item}) => {
            return (
              <View style={[styles.statusBox, styles.back]}>
                <Image 
                style={styles.statusImage}
                source={item} 
                resizeMode='cover'
                accessibilityLabel='profile'
                />
                <View style={styles.smallCon}>
                  <Image 
                  style={styles.smallImg}
                  source={item}
                  resizeMode='cover'
                  />
                </View>
              </View>
            )
          }}
           />

        </ScrollView>

        <FlatList
        data={newPost}
        scrollEnabled={false}
        renderItem={({item}) => {
          return (
            <View style={styles.postsContainer}>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.postProfCon}>
              <Image
              style={styles.postProfile} 
              source={require('../../assets/images/oye.jpg')} 
              resizeMode='cover' 
              />
              <View>
                <View>
                  <View style={styles.postName}>
                    <Text style={{fontSize: 18, fontWeight: '600', marginRight: 5}}>{fullName}</Text>
                    
                  </View>
                  <View style={styles.postName}>
                    <Text>Just now </Text>
                    <Globe size={15} />
                  </View>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', gap: 15, paddingHorizontal: 10}}>
              <Ellipsis />
              <Pressable onPress={() => deletePost(item.id) }>
                <X />
              </Pressable>
            </View>
          </View>

          <View>
            <Text style={{padding: 10}}>
            {item.text}
            </Text>
            {
              item.file === null ? 
              "" :
              <PostItem item={item} />
            }
            
          </View>

          <View 
          style={{padding: 10, flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'}}>
            <View style={{ flexDirection: 'row', gap: 2, alignItems:'center'}}>
              <View 
              style={{backgroundColor: '#00a4fc', width: 25, height: 25, borderRadius: 25, alignItems:'center',justifyContent: 'center',}}
              >
                <ThumbsUp size={18} color={'black'} fill={'white'} />
              </View>
              <View
              style={{backgroundColor: '#f93b53', width: 25, height: 25, borderRadius: 25, alignItems:'center', justifyContent: 'center',}}
              >
                <Heart size={16} fill={'white'} stroke={'white'} />
              </View>
              <Text style={{fontSize: 18}}>1</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>1 comments</Text>
              <Text>1 shares</Text>
            </View>
          </View>

          <View 
            style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom:10}}>
            <View style={styles.reactions}>
              <ThumbsUp />
              <Text>Like</Text>
            </View>
            <View style={styles.reactions}>
              <MessageCircleIcon />
              <Text>Comment</Text>
            </View>
            <View style={styles.reactions}>
              <Forward />
              <Text>Share</Text>
            </View>
          </View> 

        </View>
          )
        }}
         />
        
        <FlatList
        data={posts}
        scrollEnabled={false}
        renderItem={({item}) => {
          return (
            <View style={styles.postsContainer}>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.postProfCon}>
              <Image
              style={styles.postProfile} 
              source={item.profile} 
              resizeMode='cover' 
              />
              <View>
                <View>
                  <View style={styles.postName}>
                    <Text style={{fontSize: 18, fontWeight: '600', marginRight: 5}}>{item.name}</Text>
                    <BadgeCheck size={18} fill={'#0765ff'}  color={'white'} />
                  </View>
                  <View style={styles.postName}>
                    <Text>{item.time} </Text>
                    <Globe size={15} />
                  </View>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', gap: 15, paddingHorizontal: 10}}>
              <Ellipsis />
              <X />
            </View>
          </View>

          <View>
            <Text style={{padding: 10}}>
            {item.post}
            </Text>
            <Image 
            style={{width: '100%', height: 500}}
            source={item.image}
            resizeMode='cover'
            />
          </View>

          <View 
          style={{padding: 10, flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'}}>
            <View style={{ flexDirection: 'row', gap: 2, alignItems:'center'}}>
              <View 
              style={{backgroundColor: '#00a4fc', width: 25, height: 25, borderRadius: 25, alignItems:'center',justifyContent: 'center',}}
              >
                <ThumbsUp size={18} color={'black'} fill={'white'} />
              </View>
              <View
              style={{backgroundColor: '#f93b53', width: 25, height: 25, borderRadius: 25, alignItems:'center', justifyContent: 'center',}}
              >
                <Heart size={16} fill={'white'} stroke={'white'} />
              </View>
              <Text style={{fontSize: 18}}>{item.likes}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>{item.comments} comments</Text>
              <Text>{item.shares} shares</Text>
            </View>
          </View>

          <View 
            style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom:10}}>
            <View style={styles.reactions}>
              <ThumbsUp />
              <Text>Like</Text>
            </View>
            <View style={styles.reactions}>
              <MessageCircleIcon />
              <Text>Comment</Text>
            </View>
            <View style={styles.reactions}>
              <Forward />
              <Text>Share</Text>
            </View>
          </View> 

        </View>
          )
        }}
         />

         <Modalling name={fullName} modal={isModal} setModal={setIsModal} fetchPost={fetchPost} />


      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  img: {
    width: 150,
    height: 60,
  },
  headIcons: {
    flexDirection: 'row',
    gap: 15,
    paddingRight: 10
  } ,
  profileCon: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniCon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileimg: {
    width: '100%',
    height: '100%',
    borderRadius: 25 
  },
  inputCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center'
  },
  input: {
    paddingHorizontal: 10
  },
  statusContainer: {
    padding: 10,
    marginTop: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#dcdfe2',
  },
  statusBox: {
    borderWidth: 1,
    borderColor: '#dcdfe2',
    shadowColor: 'black',
    shadowOffset: {
      width: 50,
      height: 50
    },
    shadowRadius: 15,
    width: 115,
    height: 200,
    borderRadius: 15,
    marginRight: 6
  },
  statusImg: {
    width: '100%',
    height: '60%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },
  statusImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15
  },
  plusContainer: {
    backgroundColor: '#0765ff',
    width: 40,
    height: 40,
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    alignSelf: 'center',
    top: -15
  },
  plus: {
    color: 'white',
    margin: 'auto',
  },
  statusText: {
    alignItems: 'center'
  }, 
  back: {
    backgroundColor: 'black',
    position: 'relative'
  },
  smallCon: {
    position: 'absolute',
    top: 10,
    left: 8
  },
  smallImg: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#0765ff'
  },
  postsContainer: {
    marginTop: 10,
    borderBottomWidth: 3,
    borderColor: '#dcdfe2'
  },
  postProfCon: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  postProfile: {
    width: 50,
    height: 50,
    borderRadius: 25
  }, 
  postName: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  }
})