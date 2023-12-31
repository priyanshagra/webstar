import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../Components/ChatLogics";
import ChatLoading from "../Components/ChatLoading";
import GroupChatModal from "../Components/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Components/ChatProvider";
import { useCookies } from "react-cookie";
import { TextField } from "@material-ui/core";
import { CryptoState } from "./CryptoContext";

const MyChats = ({ fetchAgain }) => {
  const { isSwitchOn, setIsSwitchOn } = CryptoState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [search, setSearch] = useState("");

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.UserId,
        },
      };

      const { data } = await axios.get(
        "http://localhost:8000/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSearch = () => {
    return chats.filter((chat) =>
      !chat?.isGroupChat
        ? getSender(cookies.UserId, chat.users)
        : chat?.chatName.toLowerCase().includes(search)
    );
  };

  useEffect(() => {
    console.log(selectedChat);
    fetchChats();

    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg={`${isSwitchOn?"black":"silver"}`}
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      overflowY="hidden"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        diplay="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <div className={`${isSwitchOn?"text-white":"text-black"}`}>
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
        <TextField
        className="mt-2"
          label="Search for chats"
          InputLabelProps={{
            style: { color: isSwitchOn ? 'white':'black' }, // Style for the label text
          }}
          variant="outlined"
          style={{marginTop: 10, marginBottom: 10, width: "100%",  border: isSwitchOn ? '1px solid white' : '1px solid black'}}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
        style: { color: 'white' }
      }}
        />
        </div>
        <Box
          display="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {chats ? (
            <Stack overflowY="scroll" maxHeight="400px">
              {handleSearch().map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat?._id}
                >
                  <Text>
                    {!chat?.isGroupChat
                      ? getSender(cookies.UserId, chat.users)
                      : chat?.chatName}
                  </Text>
                  {chat?.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat?.latestMessage.sender?.name} : </b>
                      {chat?.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyChats;
