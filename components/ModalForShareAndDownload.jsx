import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import {
  Image,
  Pressable,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing"; // Import the sharing module
import { useState } from "react";

const ModalForShareAndDownload = ({ setshowModal, ActiveData }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    setIsDownloading(true); // Set loading state
    try {
      // Request permission to access the media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access media library is required!");
        return;
      }

      // Define the URI of the image
      const uri = ActiveData?.largeImageURL;

      // Create a file path in the device's media library
      const fileUri = `${FileSystem.documentDirectory}${ActiveData?.id}.jpg`;

      // Download the image to the defined file path
      const response = await FileSystem.downloadAsync(uri, fileUri);

      // Save the file to the media library
      await MediaLibrary.createAssetAsync(response.uri);
      Alert.alert("Success", "Image downloaded to your gallery!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to download the image.");
    } finally {
      setIsDownloading(false); // Reset loading state
    }
  }

  async function handleShare() {
    try {
      // Request permission to access the media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access media library is required!");
        return;
      }

      // Define the URI of the image
      const uri = ActiveData?.largeImageURL;

      // Create a file path in the device's media library
      const fileUri = `${FileSystem.documentDirectory}${ActiveData?.id}.jpg`;

      // Download the image to the defined file path
      const response = await FileSystem.downloadAsync(uri, fileUri);

      // Save the file to the media library
      const asset = await MediaLibrary.createAssetAsync(response.uri);

      // Share the saved image
      await Sharing.shareAsync(asset.uri);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to share the image.");
    }
  }

  function handleAddToWallpaper() {
    // Implement add to wallpaper functionality
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#0004",
        zIndex: 60,
      }}
    >
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={8}
        tint="dark"
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          onPress={() => setshowModal(false)}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
        >
          <Pressable
            style={{
              height: ActiveData?.previewHeight * 2 + 60,
              width: ActiveData?.previewWidth * 2,
              borderRadius: 20,
            }}
            onPress={() => console.log("hii")}
          >
            <Animated.View
              pointerEvents={"none"}
              entering={FadeInUp.duration(500)}
              exiting={FadeOutDown.duration(500)}
              style={[{ flex: 1, borderRadius: 20 }]}
            >
              <Image
                style={{
                  width: ActiveData?.previewWidth * 2,
                  height: ActiveData?.previewHeight * 2,
                  borderRadius: 20,
                }}
                source={{ uri: ActiveData?.previewURL }}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(500)}
              exiting={FadeOutUp.duration(500)}
              style={{
                width: "100%",
                height: 60,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <BlurView
                experimentalBlurMethod="dimezisBlurView"
                intensity={100}
                tint="dark"
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={handleAddToWallpaper}>
                  <MaterialIcons name="now-wallpaper" size={22} color="white" />
                </TouchableOpacity>
              </BlurView>
              <BlurView
                experimentalBlurMethod="dimezisBlurView"
                intensity={100}
                tint="dark"
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={isDownloading ? null : handleDownload}
                >
                  {isDownloading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Feather name="download" size={22} color="white" />
                  )}
                </TouchableOpacity>
              </BlurView>
              <BlurView
                experimentalBlurMethod="dimezisBlurView"
                intensity={100}
                tint="dark"
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={handleShare}>
                  <Entypo name="share" size={22} color="white" />
                </TouchableOpacity>
              </BlurView>
            </Animated.View>
          </Pressable>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

export default ModalForShareAndDownload;
