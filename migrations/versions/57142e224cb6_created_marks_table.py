"""created marks table

Revision ID: 57142e224cb6
Revises: d401dada6b47
Create Date: 2023-03-30 15:32:01.270127

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '57142e224cb6'
down_revision = 'd401dada6b47'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('marks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.Column('caller_id', sa.Integer(), nullable=False),
    sa.Column('marked_id', sa.Integer(), nullable=False),
    sa.Column('time', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['caller_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], ),
    sa.ForeignKeyConstraint(['marked_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('marks')
    # ### end Alembic commands ###