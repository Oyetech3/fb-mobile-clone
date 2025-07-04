import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { BadgeCheck, BookImage, Ellipsis, Forward, Globe, Heart, MessageCircle, MessageCircleIcon, Plus, Search, ThumbsUp, X } from 'lucide-react-native'

export default function Home() {

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
            <Plus />
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
          <View style={styles.inputCon}>
            <TextInput 
            style={styles.input}
            placeholder="What's on your mind?" 
            placeholderTextColor={'black'} 
            />
            <BookImage />
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.statusContainer} showsHorizontalScrollIndicator={false}>
          
          <View style={styles.statusBox}>
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
          </View>

          <View style={[styles.statusBox, styles.back]}>
            <Image 
            style={styles.statusImage}
            source={require('../../assets/images/messi.jpeg')} 
            resizeMode='cover'
            accessibilityLabel='profile'
            />
            <View style={styles.smallCon}>
              <Image 
              style={styles.smallImg}
              source={require('../../assets/images/messi.jpeg')}
              resizeMode='cover'
              />
            </View>
          </View>

          <View style={[styles.statusBox, styles.back]}>
            <Image 
            style={styles.statusImage}
            source={require('../../assets/images/leo.jpg')} 
            resizeMode='cover'
            accessibilityLabel='profile'
            />
            <View style={styles.smallCon}>
              <Image 
              style={styles.smallImg}
              source={require('../../assets/images/leo.jpg')}
              resizeMode='cover'
              />
            </View>
          </View>

          <View style={[styles.statusBox, styles.back]}>
            <Image 
            style={styles.statusImage}
            source={require('../../assets/images/leoo.jpg')} 
            resizeMode='cover'
            accessibilityLabel='profile'
            />
            <View style={styles.smallCon}>
              <Image 
              style={styles.smallImg}
              source={require('../../assets/images/leoo.jpg')}
              resizeMode='cover'
              />
            </View>
          </View>

          <View style={[styles.statusBox, styles.back]}>
            <Image 
            style={styles.statusImage}
            source={require('../../assets/images/abu.jpg')} 
            resizeMode='cover'
            accessibilityLabel='profile'
            />
            <View style={styles.smallCon}>
              <Image 
              style={styles.smallImg}
              source={require('../../assets/images/abu.jpg')}
              resizeMode='cover'
              />
            </View>
          </View>

          <View style={[styles.statusBox, styles.back]}>
            <Image 
            style={styles.statusImage}
            source={require('../../assets/images/bro.jpg')} 
            resizeMode='cover'
            accessibilityLabel='profile'
            />
            <View style={styles.smallCon}>
              <Image 
              style={styles.smallImg}
              source={require('../../assets/images/bro.jpg')}
              resizeMode='cover'
              />
            </View>
          </View>

        </ScrollView>

        <View style={styles.postsContainer}>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.postProfCon}>
              <Image
              style={styles.postProfile} 
              source={require('../../assets/images/fabrizo.jpg')} 
              resizeMode='cover' 
              />
              <View>
                <View>
                  <View style={styles.postName}>
                    <Text style={{fontSize: 18, fontWeight: '600', marginRight: 5}}>Fabrizio Romano</Text>
                    <BadgeCheck size={18} fill={'#0765ff'}  color={'white'} />
                  </View>
                  <View style={styles.postName}>
                    <Text>20m . </Text>
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
            🚨🚨 𝐑𝐄𝐕𝐄𝐀𝐋𝐄𝐃: Ansu Fati SIGNED new deal at Barcelona until JUNE 2028 before leaving for AS Monaco deal. 💙❤️‍🔥
            </Text>
            <Image 
            style={{width: '100%', height: 500}}
            source={require('../../assets/images/fabrizopost.jpg')}
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
              <Text style={{fontSize: 18}}>38</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>9 comments</Text>
              <Text>5 shares</Text>
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

        <View style={styles.postsContainer}>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.postProfCon}>
              <Image
              style={styles.postProfile} 
              source={require('../../assets/images/rs.jpg')} 
              resizeMode='cover' 
              />
              <View>
                <View>
                  <View style={styles.postName}>
                    <Text style={{fontSize: 18, fontWeight: '600', marginRight: 5}}>Rising Ballers</Text>
                  </View>
                  <View style={styles.postName}>
                    <Text>1h . </Text>
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
            Absolutely awful news coming out this morning. I can’t believe I’m even typing this. Diogo Jota has sadly passed away in a car accident along with his brother. 💔

            Only won the nations league a few weeks ago, and got married this week. Rest in perfect peace. Sending love to all his family, friends & team mates. ❤️🙏🏼
            </Text>
            <Image 
            style={{width: '100%', height: 500}}
            source={require('../../assets/images/rspost.jpg')}
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
              <Text style={{fontSize: 18}}>1k</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>48 comments</Text>
              <Text>47 shares</Text>
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

        <View style={styles.postsContainer}>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.postProfCon}>
              <Image
              style={styles.postProfile} 
              source={require('../../assets/images/asianpro.jpg')} 
              resizeMode='cover' 
              />
              <View>
                <View>
                  <View style={styles.postName}>
                    <Text style={{fontSize: 18, fontWeight: '600', marginRight: 5}}>My Asian Drama</Text>
                    <BadgeCheck size={18} fill={'#0765ff'}  color={'white'} />
                  </View>
                  <View style={styles.postName}>
                    <Text>8m . </Text>
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
            Kuyun&apos;s analysis of ratings for the first half of the year shows that the drama &quot;#SiJin featuring #JingTian and #ZhangWanyi ranks second; it is also the most-watched historical drama on #Dragon Satellite TV in the first half of the year.

            #Dragon TV&apos;s main target audience, which follows the most successful series, consists predominantly of viewers who prefer contemporary dramas. &quot;#SiJin has ranked second in the #Kuyun ratings for two consecutive quarters.

            The ratings curve for drama series in the first half of the year shows that &quot;#SiJin gradually gained ratings after the series change. The ratings started high but experienced a slight decline in the interim before gaining momentum in the second half of the broadcast, reaching #Kuyun&apos;s peak ratings of over 0.5 for five consecutive days, with most of the peak ratings concentrated in the second half of the storyline.
            </Text>
            <Image 
            style={{width: '100%', height: 500}}
            source={require('../../assets/images/asian.jpg')}
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
              <Text style={{fontSize: 18}}>10</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text>2 comments</Text>
              <Text>5 shares</Text>
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
    flex: 1
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