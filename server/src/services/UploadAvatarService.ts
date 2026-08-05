import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

class UploadAvatarService {
  async execute(
    userId: string,
    fileBuffer: Buffer,
    mimeType: string,
    originalName: string,
  ) {
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) throw new AppError('User not found', 404);

    const fileExtension = originalName.split('.').pop();
    const fileName = `avatar-${randomUUID()}.${fileExtension}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    console.log('Upload data:', uploadData);

    if (uploadError) {
      console.error(uploadError);
      throw new AppError('Failed to upload image to storage', 500);
    }

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    const avatarUrl = publicUrlData.publicUrl;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_AVATAR',
        userId: userId,
        description: `Atualizou seu avatar.'}`,
        category: 'SYSTEM',
      },
    });

    return {
      message: 'Avatar updated successfully',
      avatarUrl: updatedUser.avatarUrl,
    };
  }
}

export default UploadAvatarService;
