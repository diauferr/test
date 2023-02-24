import { UserSession } from './UserSession';
import { ProductInfo } from '../ProductInfo';
import { ProductType } from '../../enums/ProductType';
import { NewsFeedCodeType } from '../../enums/NewsFeedCodeType';

describe('UserSession', () => {
  test('deve retornar true se o usuario tiver itens contratados', () => {
    const userSession = new UserSession(
      '',
      1234,
      'teste',
      '987654',
      'asdjjhdashjdasfhjafhfd17781941327413761437',
      [
        new ProductInfo(ProductType.Books, 'Humanismo', 123),
        new ProductInfo(ProductType.Videos, 'Humanismo', 123),
        new ProductInfo(ProductType.Codes, 'Humanismo', 123),
        new ProductInfo(ProductType.Clipping, 'Humanismo', 123),
        new ProductInfo(ProductType.Periodics, 'Humanismo', 123)
      ],
      null,
      'teste',
      'teste@email.com',
      null
    );

    expect(userSession.hasAccessToProduct(ProductType.Books)).toBe(true);
    expect(userSession.hasAccessToProduct(ProductType.Videos)).toBe(true);
    expect(userSession.hasAccessToProduct(ProductType.Codes)).toBe(true);
    expect(userSession.hasAccessToProduct(ProductType.Clipping)).toBe(true);
    expect(userSession.hasAccessToProduct(ProductType.Periodics)).toBe(true);
  });

  test('deve retornar true se o usuario tiver acesso a um tipo de informativo', () => {
    const userSession = new UserSession(
      '',
      1234,
      'teste',
      '987654',
      'asdjjhdashjdasfhjafhfd17781941327413761437',
      [
        new ProductInfo(ProductType.Books, 'Humanismo', 123),
        new ProductInfo(ProductType.Videos, 'Humanismo', 123),
        new ProductInfo(ProductType.Codes, 'Humanismo', 123),
        new ProductInfo(ProductType.Clipping, 'Jacoby', 186),
        new ProductInfo(ProductType.Clipping, 'Abradt', 196),
        new ProductInfo(ProductType.Periodics, 'Humanismo', 123)
      ],
      null,
      'teste',
      'teste@email.com',
      null
    );

    expect(userSession.hasAccessToNewsFeed(NewsFeedCodeType.ABRADT)).toBe(true);
    expect(userSession.hasAccessToNewsFeed(NewsFeedCodeType.Jacoby)).toBe(true);
  });

  test('Deve retornar true se tiver apenas informativos nos produtos contratados', () => {
    const userSession = new UserSession(
      '',
      1234,
      'teste',
      '987654',
      'asdjjhdashjdasfhjafhfd17781941327413761437',
      [
        new ProductInfo(ProductType.Clipping, 'Jacoby', 186),
        new ProductInfo(ProductType.Clipping, 'Abradt', 196)
      ],
      null,
      'teste',
      'teste@email.com',
      null
    );

    expect(userSession.hasAccessOnlyForClipping()).toBe(true);
  });
});
