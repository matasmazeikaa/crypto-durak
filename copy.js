import { Injectable } from '@nestjs/common';
import { Player } from './entities/player.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  rooms: { [key: string]: Room } = {};

  create(room: Room) {
    this.rooms = {
      ...this.rooms,
      [room.id]: {
        id: room.id,
        players: room.players,
        name: room.name,
      },
    };
  }

  leaveRoom(roomId: string, playerId: string) {
    const newRooms =  
  }

  addPlayerToRoom(room: Room, player: Player) {}
}


import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { RoomsService } from './rooms.service';
  import { v4 as generateId } from 'uuid';
  
  @WebSocketGateway({ cors: true })
  export class RoomsGateway {
    @WebSocketServer() server: Server;
  
    constructor(private roomsService: RoomsService) {}
  
    @SubscribeMessage('joinRoom')
    joinRoom(client: Socket, room: string) {
      client.join(room);
      client.emit('joinedRoom', room);
      console.log('joined room', room);
      console.log(client.rooms);
    }
  
    @SubscribeMessage('createRoom')
    createRoom(client: Socket, userName: string) {
      const roomId = generateId();
      console.log(roomId);
      const room = {
        id: roomId,
        name: userName,
        players: [{ name: userName, id: userName }],
      };
  
      client.join(roomId);
      client.emit('roomCreated', JSON.stringify(room));
      client.emit('joinRoom', roomId);
  
      this.roomsService.create(room);
  
      this.updateRooms(client);
    }
  
    @SubscribeMessage('leaveRoom')
    leaveRoom(client: Socket, roomId: string) {
      client.leave(roomId);
      client.emit('leftRoom', roomId);
    }
  
    @SubscribeMessage('updateRooms')
    updateRooms(client: Socket) {
      client.send(
        JSON.stringify({
          type: 'updateRooms',
          rooms: this.roomsService.rooms,
        }),
      );
    }
  }
  