# Dockerfile para Laravel
FROM php:8.4-fpm-alpine AS base

# Instalar dependências do sistema
RUN apk add --no-cache \
    bash \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    postgresql-dev \
    oniguruma-dev \
    libxml2-dev

# Instalar extensões PHP
RUN docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Stage de dependências
FROM base AS dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Stage de build
FROM base AS builder
COPY --from=dependencies /var/www/html/vendor ./vendor
COPY . .

RUN composer dump-autoload --optimize --no-dev \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Stage final
FROM base AS runner

# Criar usuário não-root
RUN addgroup -g 1000 laravel && adduser -D -u 1000 -G laravel laravel

# Copiar aplicação
COPY --from=builder --chown=laravel:laravel /var/www/html /var/www/html

# Permissões
RUN chown -R laravel:laravel /var/www/html/storage /var/www/html/bootstrap/cache

USER laravel

EXPOSE 9000

CMD ["php-fpm"]