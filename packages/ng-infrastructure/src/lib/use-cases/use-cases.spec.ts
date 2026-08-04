import { TestBed } from '@angular/core/testing';
import { firstValueFrom, throwError } from 'rxjs';
import { LoggingService } from '../services/logging-service';
import { Command } from './commands';
import { Query } from './queries';

class FailingCommand extends Command<void, void> {
  protected executeInternal() {
    return throwError(() => new Error('command failed'));
  }
}

class FailingQuery extends Query<void, void> {
  protected executeInternal() {
    return throwError(() => new Error('query failed'));
  }
}

describe('use cases', () => {
  const logger = {
    error: vi.fn(),
  };

  beforeEach(() => {
    logger.error.mockReset();
    TestBed.configureTestingModule({
      providers: [{ provide: LoggingService, useValue: logger }],
    });
  });

  it('logs command errors without injecting from an RxJS callback', async () => {
    const command = TestBed.runInInjectionContext(() => new FailingCommand());

    await expect(firstValueFrom(command.execute())).rejects.toThrow('command failed');
    expect(logger.error).toHaveBeenCalledWith(
      'An error occurred during command execution:',
      expect.any(Error),
    );
  });

  it('logs query errors without injecting from an RxJS callback', async () => {
    const query = TestBed.runInInjectionContext(() => new FailingQuery());

    await expect(firstValueFrom(query.execute())).rejects.toThrow('query failed');
    expect(logger.error).toHaveBeenCalledWith(
      'An error occurred during query execution:',
      expect.any(Error),
    );
  });
});
