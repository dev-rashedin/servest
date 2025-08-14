import { main } from '../src/index';

describe('src/index', () => {
  it('should call cli function', async () => {
    const cliSpy = jest.spyOn(require('yargs'), 'command');
    await main();
    expect(cliSpy).toHaveBeenCalledTimes(1);
  });
});
