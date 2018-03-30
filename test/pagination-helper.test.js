/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import PaginationHelper from '../src/pagination-helper';

describe('PaginationHelper', () => {
  it('should be importable from package', () => {
    expect(typeof PaginationHelper).toEqual('function');
  });
});

describe('getClosestPage(page)', () => {
  const pagination = new PaginationHelper({
    limit: 10,
    page: 1,
    total: 100,
  });

  it('should return 1 if page is 0', () => {
    expect(pagination.getClosestPage(0)).toEqual(1);
  });

  it('should return the last page if page is above page count', () => {
    expect(pagination.getClosestPage(25)).toEqual(10);
  });

  it('should return the same page if there nothing to fix', () => {
    expect(pagination.getClosestPage(5)).toEqual(5);
  });
});

describe('getLastPage()', () => {
  const pagination = new PaginationHelper({
    limit: 10,
    page: 1,
    total: 100,
  });

  it('should return the last page', () => {
    expect(pagination.getLastPage()).toEqual(10);
  });
});

describe('getLimit()', () => {
  const pagination = new PaginationHelper({
    limit: 5,
    page: 1,
    total: 100,
  });

  it('should return the limit per page', () => {
    expect(pagination.getLimit()).toEqual(5);
  });
});

describe('getNextPage()', () => {
  it('should return the next page if there is a page after', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 5,
      total: 100,
    });
    expect(pagination.getNextPage()).toEqual(6);
  });

  it('should return the last page if there is no page after', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 10,
      total: 100,
    });
    expect(pagination.getNextPage()).toEqual(10);
  });
});

describe('getOffset()', () => {
  it('should return the offset', () => {
    const p1 = new PaginationHelper({
      limit: 10,
      page: 1,
      total: 100,
    });
    const p2 = new PaginationHelper({
      limit: 10,
      page: 5,
      total: 100,
    });
    expect(p1.getOffset()).toEqual(0);
    expect(p2.getOffset()).toEqual(40);
  });
});

describe('getPage()', () => {
  const pagination = new PaginationHelper({
    limit: 10,
    page: 3,
    total: 100,
  });

  it('should return the current page', () => {
    expect(pagination.getPage()).toEqual(3);
  });
});

describe('getPageCount()', () => {
  const pagination = new PaginationHelper({
    limit: 10,
    page: 1,
    total: 100,
  });

  it('should return the page count', () => {
    expect(pagination.getPageCount()).toEqual(10);
  });
});

describe('getPreviousPage()', () => {
  it('should return the previous page if there is a page before', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 5,
      total: 100,
    });
    expect(pagination.getPreviousPage()).toEqual(4);
  });

  it('should return the first page if there is no page before', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 1,
      total: 100,
    });
    expect(pagination.getPreviousPage()).toEqual(1);
  });
});

describe('getTotal()', () => {
  const pagination = new PaginationHelper({
    limit: 10,
    page: 1,
    total: 100,
  });

  it('should return the total', () => {
    expect(pagination.getTotal()).toEqual(100);
  });
});

describe('hasNext()', () => {
  it('should return true if there is a page after', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 1,
      total: 100,
    });
    expect(pagination.hasNext()).toEqual(true);
  });

  it('should return false if there is no page after', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 10,
      total: 100,
    });
    expect(pagination.hasNext()).toEqual(false);
  });
});

describe('hasPrevious()', () => {
  it('should return true if there is a page before', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 5,
      total: 100,
    });
    expect(pagination.hasPrevious()).toEqual(true);
  });

  it('should return false if there is no page before', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 1,
      total: 100,
    });
    expect(pagination.hasPrevious()).toEqual(false);
  });
});

describe('isPageValid(page)', () => {
  const pagination = new PaginationHelper({
    limit: 10,
    page: 1,
    total: 100,
  });

  it('should return false if page is below 1', () => {
    expect(pagination.isPageValid(0)).toEqual(false);
  });

  it('should return true if page is in valid range', () => {
    expect(pagination.isPageValid(1)).toEqual(true);
  });

  it('should return false if page is above page count', () => {
    expect(pagination.isPageValid(300)).toEqual(false);
  });
});

describe('next()', () => {
  it('should increase offset if there is a page after', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 5,
      total: 100,
    }).next();
    expect(pagination.getOffset()).toEqual(50);
  });

  it('should not increase offset if there is no page after', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 10,
      total: 100,
    }).next();
    expect(pagination.getOffset()).toEqual(90);
  });
});

describe('previous()', () => {
  it('should decrease offset if there is a page before', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 2,
      total: 100,
    }).previous();
    expect(pagination.getOffset()).toEqual(0);
  });

  it('should not decrease offset if there is no page before', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 1,
      total: 100,
    }).previous();
    expect(pagination.getOffset()).toEqual(0);
  });
});

describe('setLimit(limit)', () => {
  it('should change the limit per page', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 1,
      total: 100,
    }).setLimit(25);
    expect(pagination.getLimit()).toEqual(25);
  });

  it('should change the limit to 0 if limit is negative', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 1,
      total: 100,
    }).setLimit(-1);
    expect(pagination.getLimit()).toEqual(0);
  });
});

describe('setOffset(offset)', () => {
  it('should change the offset', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 1,
      total: 100,
    }).setOffset(25);
    expect(pagination.getOffset()).toEqual(25);
  });

  it('should change the offset to 0 if offset is negative', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 1,
      total: 100,
    }).setLimit(-1);
    expect(pagination.getOffset()).toEqual(0);
  });
});

describe('setPage(page)', () => {
  it('should change the page', () => {
    const pagination = new PaginationHelper({
      limit: 10,
      page: 1,
      total: 100,
    }).setPage(5);
    expect(pagination.getPage()).toEqual(5);
  });
});
