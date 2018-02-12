import { TestBed, inject } from '@angular/core/testing';

import { SocketIoService } from './socket-io.service';

describe('SocketIoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketIoService]
    });
  });

  it('should ...', inject([SocketIoService], (service: SocketIoService) => {
    expect(service).toBeTruthy();
  }));
});
