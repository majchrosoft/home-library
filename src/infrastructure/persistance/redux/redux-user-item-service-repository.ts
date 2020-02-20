import { UserItemServiceRepository } from '../../../app/item/user-item-service/user-item-service.repository';
import { UserItem } from '../../../app/item/user-item.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ReduxUserItemServiceRepository implements UserItemServiceRepository {
    add(userItem: UserItem): void {
    }

    all(): UserItem[] {
        return [];
    }

    ofId(id: string) {
    }

    remove(userItem: UserItem): void {
    }

}
