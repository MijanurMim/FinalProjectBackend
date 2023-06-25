import mongoose from 'mongoose';
import app from './app';
import config from './config/config.index';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

// UncaughtException Error Handler
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`Database is connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed To Connect Database =>', err);
  }

  // UnhandledRejection error Handler
  process.on('unhandledRejection', err => {
    console.log(
      'Unhandled Rejection is detected, we are closing our server... '
    );
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

// Signal Termination Handler
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');

  if (server) {
    server.close();
  }
});
